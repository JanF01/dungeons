import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobubbleComponent } from './infobubble.component';

describe('InfobubbleComponent', () => {
  let component: InfobubbleComponent;
  let fixture: ComponentFixture<InfobubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfobubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfobubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
