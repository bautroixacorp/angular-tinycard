import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Card, Back } from '../card';
import { HttpServiceService } from '../http-service.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class CreateCardComponent implements OnInit {

  @Input() card: Card;
  @Input() cardArray: Card[];
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() up: EventEmitter<any> = new EventEmitter();
  @Output() down: EventEmitter<any> = new EventEmitter();
  @Output() selectCard: EventEmitter<any> = new EventEmitter();
  @Output() selectCardImage: EventEmitter<any> = new EventEmitter();
  @Output() deleteCardImage: EventEmitter<any> = new EventEmitter();

  imagePreview: string = "nulls";

  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
  }
  getIndex(cardID) {
    var cardIndex = this.cardArray.findIndex(function (c) {
      return c.id === cardID;
    });
    return (cardIndex);
  }

  addFact() {
    if (this.card.backArray.length < 3) {
      var backArrayLength = this.card.backArray.length;
      var newBack = new Back("");
      if (backArrayLength>0){
        newBack.setID(this.card.backArray[backArrayLength-1].id+1);
      } else {
        newBack.setID(1);
      }
      this.card.backArray.push(newBack);
    }
    else {
      // alert("full");
    }
  }
  deleteFact(id) {
    if (this.card.backArray.length > 1) {
      var findIndexBackCard = this.card.backArray.findIndex(function (e) {
        return e.id == id;
      });
      this.card.backArray.splice(findIndexBackCard, 1);
    }
  }
  deleteCard() {
    this.delete.emit(this.card.id);
  }
  moveUpCard() {
    this.up.emit(this.card.id);
  }
  moveDownCard() {
    this.down.emit(this.card.id);
  }
  canUp() {
    var cardID = this.card.id;
    var cardIndex = this.getIndex(cardID);
    return (cardIndex === 0);
  }
  canDown() {
    var cardID = this.card.id;
    var cardIndex = this.getIndex(cardID);
    return (cardIndex === this.cardArray.length - 1);
  }
  selectFront(cardID) {
    this.selectCard.emit(cardID);
  }
  fileSelected(uploadFile: any) {
    const file = uploadFile;
    this.httpService.uploadImageServer(file)
      .then(resJSON => {
        if (!resJSON.err) {
          this.imagePreview = "https://nhom-7-4.herokuapp.com/uploads/" + resJSON.fileName;
        } else {
          alert(resJSON.err);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  confirmImage() {
    this.selectCardImage.emit(this.imagePreview);
  }
  deleteImage() {
    this.deleteCardImage.emit();
  }

}
