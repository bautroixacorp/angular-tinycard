import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Card, Front } from '../card';
import { ActivatedRoute, ParamMap, Data, Router } from '@angular/router';
import { Deck } from '../deck';
import { HttpServiceService } from './../http-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class CreateComponent implements OnInit {

  deck: Deck = new Deck();
  deckID: string;
  createNew: boolean = true;
  selectCardFront: number = -1;

  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.init();
  }
  init() {
    var loadDeckID;
    this.route.paramMap.subscribe((params: ParamMap) => {
      loadDeckID = params.get("id");
    });
    this.deckID = loadDeckID;
    if (loadDeckID){
      this.httpService.getServer("/api/deck/" + this.deckID).then(r => {
        if (r.err == null) {
          this.deck.setRaw(r._id, r.name, r.description, r.author.name, r.cards, r.favourites, r.themeImage);
          this.createNew = false;
        }else {
          alert("ERR: "+r.message);
        }
      }).catch(err => console.log(err));
    }
    if (this.createNew) {
      this.addCard();
    }
    this.route.data.subscribe((data: Data) => {
      console.log(data.title);
    })
  }

  getIndex(id) {
    return this.deck.cardArray.findIndex(function (c) {
      return c.id == id;
    });
  }
  addCard() {
    var newCard = new Card();
    if (this.deck.cardArray.length>0){
      newCard.setID(this.deck.cardArray[this.deck.cardArray.length-1].id+1);
    } else {
      newCard.setID(1);
    }
    this.deck.cardArray.push(newCard);
  }
  deleteCard(id) {
    this.deck.cardArray.splice(this.getIndex(id), 1);
  }
  moveUpCard(id) {
    var index = this.getIndex(id);
    if (index == 0) {
      // alert("imposible")
    } else {
      var temp = this.deck.cardArray[index];
      this.deck.cardArray[index] = this.deck.cardArray[index - 1];
      this.deck.cardArray[index - 1] = temp;
    }
  }
  moveDownCard(id) {
    var index = this.getIndex(id);
    if (index == this.deck.cardArray.length - 1) {
      // alert("imposible")
    } else {
      var temp = this.deck.cardArray[index];
      this.deck.cardArray[index] = this.deck.cardArray[index + 1];
      this.deck.cardArray[index + 1] = temp;
    }
  }
  selectCard(id: number) {
    this.selectCardFront = id;
  }
  selectCardImage(imageLink: string) {
    var selectID = this.selectCardFront
    var cardIndex = this.deck.cardArray.findIndex(function (c) {
      return c.id === selectID;
    });
    this.deck.cardArray[cardIndex].front.type = "image";
    this.deck.cardArray[cardIndex].front.data = imageLink;
  }
  deleteCardImage(event) {
    var selectID = this.selectCardFront
    var cardIndex = this.deck.cardArray.findIndex(function (c) {
      return c.id === selectID;
    });
    this.deck.cardArray[cardIndex].front.type = "text";
    this.deck.cardArray[cardIndex].front.data = "";
  }
  submit() {
    // alert("SUBMITED COLLECTION " + this.title + " IN CONSOLE");
    console.log(this.deck.getRaw());
    if (this.createNew){
      this.httpService.postServer("/api/deck/", this.deck.getRaw())
      .then(resJson => alert(resJson.message))
      .catch(err => console.log(err));
    } else {
      this.httpService.putServer("/api/deck/"+this.deckID, this.deck.getRaw())
      .then(resJson => alert(resJson.message))
      .catch(err => console.log(err));
    }
    
  }
  reload(){
    window.location.reload();
  }
  deleteDeck() {
    this.httpService.deleteServer("/api/deck/"+this.deckID)
      .then(resJSON => {
        alert(resJSON.message);
      })
      .catch(err => console.log(err));
    this.reload();
  }

  fileSelected(uploadFile: any) {
    const file: File = uploadFile;
    this.httpService.uploadImageServer(file)
      .then(resJSON => {
        if (!resJSON.err) {
          this.deck.coverImage = "https://nhom-7-4.herokuapp.com/uploads/" + resJSON.fileName;
        } else {
          alert(resJSON.err);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


}
