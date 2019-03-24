import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpServiceService } from './../http-service.service';
import { User } from '../user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Deck } from '../deck';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class ProfileComponent implements OnInit {

  getUsername: string = "current";
  deckList:Deck[] = [];
  favDeckList:Deck[] = [];
  deckListLength:number;

  userData = new User();
  loadingDeck = {
    status: true,
    message: "Loading..."
  }
  loadingFavDeck = {
    status: true,
    message: "Loading..."
  }
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }
  init(){
    var loadUsername;
    this.route.paramMap.subscribe((params: ParamMap) => {
      loadUsername = params.get("id");
    });
    this.getUsername = loadUsername?loadUsername:"currentUser";
    this.getProfile();
    this.getDeckList();
    this.getFavDeckList();
  }

  getProfile() {
    this.httpService.getServer("/api/user/"+this.getUsername)
      .then(r => {
        console.log(r);
        this.userData.set(r._id, r.username, r.email, r.name, r.bio?r.bio:"");
      })
      .catch(err => console.log(err));
  }

  getDeckList() {
    this.deckListLength = 0;
    this.httpService.getServer("/api/"+this.getUsername+"/desks")
      .then(r => {
        r.forEach(deck => {
          let newDeck = new Deck();
          newDeck.set(deck._id, deck.name, deck.description, deck.authorName, deck.cards, deck.favourites, deck.themeImage);
          this.deckList.push(newDeck);
        });
      })
      .then(data => {
        console.log(this.deckListLength);
        if (this.deckList.length > 0) {
          this.loadingDeck.status = false;
        } else {
          this.loadingDeck.message = "Bạn chưa có bộ thẻ nào!";
        }
      })
      .catch(err => {
        console.log("err: Can't connect to server");
        this.loadingDeck.message = "Không thể kết nối!";
        console.log(err);
      });
  }
  getFavDeckList() {
    this.deckListLength = 0;
    this.httpService.getServer("/api/currentUser/desks/favorite")
      .then(r => {
        r.forEach(deck => {
          let newDeck = new Deck();
          newDeck.set(deck._id, deck.name, deck.description, deck.authorName, deck.cards, deck.favourites, deck.themeImage);
          this.favDeckList.push(newDeck);
        });
      })
      .then(data => {
        console.log(this.deckListLength);
        if (this.deckList.length > 0) {
          this.loadingFavDeck.status = false;
        } else {
          this.loadingFavDeck.message = "Bạn chưa thích bộ thẻ nào!"
        }
      })
      .catch(err => {
        console.log("err: Can't connect to server 2");
        this.loadingFavDeck.message = "Không thể kết nối 2!";
        console.log(err);
      });
  }

}
