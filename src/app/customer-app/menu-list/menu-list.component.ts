import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IMenuData } from 'src/app/shared/models/common-model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Input() foods: IMenuData[] = [];
  @Input() resName: string;
  constructor(private orderService: OrderService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('svg-minus', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/minus.svg'));
    this.matIconRegistry.addSvgIcon('svg-plus', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/plus.svg'));
   }

  ngOnInit() {
  }

  removeFromCart(item: IMenuData) {
    this.orderService.removeFromCart(item);
  }
  addToCart(item: IMenuData) {
    this.orderService.addToCart({...item});
  }

  isAddedToCart(item: IMenuData) {
    return this.orderService.isAddedToCart(item);
  }

  countInCart(item: IMenuData) {
    return this.orderService.countInCart(item);
  }

  getPrice(item: number) {
    return this.orderService.getPrice(item);
  }


}
