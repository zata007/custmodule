import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLandingComponent } from './item-landing.component';

describe('ItemLandingComponent', () => {
  let component: ItemLandingComponent;
  let fixture: ComponentFixture<ItemLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
