import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZataakseSliderComponent } from './zataakse-slider.component';

describe('ZataakseSliderComponent', () => {
  let component: ZataakseSliderComponent;
  let fixture: ComponentFixture<ZataakseSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZataakseSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZataakseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
