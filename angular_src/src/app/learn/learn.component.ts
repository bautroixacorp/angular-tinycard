import { Inject, Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private document, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  // ADD JS -- thank to stackOverFlow
  ngAfterViewInit() {
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = './js/2.4.js';
    const __this = this;
    s.onload = function () { __this.afterScriptAdded(); };
    this.elementRef.nativeElement.appendChild(s);
  }
  // ADD JS -- thank to stackOverFlow
  afterScriptAdded() {
    const params= {
      width: '350px',
      height: '420px',
    };
    if (typeof (window['functionFromExternalScript']) === 'function') {
      window['functionFromExternalScript'](params);
    }
  }

}
