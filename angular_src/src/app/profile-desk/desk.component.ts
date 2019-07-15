import { Component, OnInit, Input } from '@angular/core';
import { Deck } from './../deck';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Input() deck : Deck;
  constructor() { }

  ngOnInit() {
  }

}
