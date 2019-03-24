import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Deck } from '../deck';
import { HttpServiceService } from '../http-service.service';
import { User } from './../user';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class DecksComponent implements OnInit {

  deck: Deck = new Deck();
  isFavourited : Boolean = true;

  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }
  init(){
    var loadDeskID = "1";
    this.route.paramMap.subscribe((params: ParamMap) => {
      loadDeskID = params.get("id");
    });
    this.getDeck(loadDeskID);
  }

  getDeck(deskID) {
    this.httpService.getServer("/api/deck/"+deskID)
      .then(r => {
        if (!r.err) {
          this.deck.setRaw(r._id, r.name, r.description, r.author.name, r.cards, r.favourites, r.themeImage);
        } else {
          alert(r.err);
        }
      })
      .catch(err => console.log(err));
  }
  favourited(){
    this.isFavourited = !this.isFavourited;
  }

}
