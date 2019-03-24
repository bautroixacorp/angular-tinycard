import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-decks-card',
  templateUrl: './decks-card.component.html',
  styleUrls: ['./decks-card.component.css']
})
export class DecksCardComponent implements OnInit {

  @Input() card: Card;
  @Input() cardArray: Card[];
  showFront = true;
  
  constructor() { }

  ngOnInit() {}

  flip(){
    this.showFront = !this.showFront;
  }

}
