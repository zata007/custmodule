import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitstopLandingComponent } from './pitstop-landing.component';

describe('PitstopLandingComponent', () => {
  let component: PitstopLandingComponent;
  let fixture: ComponentFixture<PitstopLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitstopLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitstopLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
