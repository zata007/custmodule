import { Component, OnInit, Input } from '@angular/core';
import { OrderedItem } from '../customer.model';
import { OrderService } from '../order.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pitstop-landing',
  templateUrl: './pitstop-landing.component.html',
  styleUrls: ['./pitstop-landing.component.scss']
})
export class PitstopLandingComponent implements OnInit {

  @Input() foods = [];
  constructor(private orderService: OrderService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('svg-minus', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/minus.svg'));
    this.matIconRegistry.addSvgIcon('svg-plus', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/plus.svg'));
   }

  ngOnInit() {
  }

  removeFromCart(item: OrderedItem) {
    this.orderService.removeFromCart(item);
  }
  addToCart(item: OrderedItem) {
    this.orderService.addToCart({...item});
  }

  isAddedToCart(item: OrderedItem) {
    return this.orderService.isAddedToCart(item);
  }

  countInCart(item: OrderedItem) {
    return this.orderService.countInCart(item);
  }

  getPrice(item: number) {
    return this.orderService.getPrice(item);
  }


}
