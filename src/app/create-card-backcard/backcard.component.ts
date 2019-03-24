import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Back } from '../card';


@Component({
  selector: 'app-backcard',
  templateUrl: './backcard.component.html',
  styleUrls: ['./backcard.component.css']
})
export class BackcardComponent implements OnInit {

  @Input() back: Back;
  @Input() backArray: Back[];

  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deleteBack(){
    this.delete.emit(this.back.id);
  }
}
