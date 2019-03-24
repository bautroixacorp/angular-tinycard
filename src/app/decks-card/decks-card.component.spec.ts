import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksCardComponent } from './decks-card.component';

describe('DesksCardComponent', () => {
  let component: DecksCardComponent;
  let fixture: ComponentFixture<DecksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecksCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
