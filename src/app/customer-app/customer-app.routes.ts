import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { MapVehicleComponent } from './map-vehicle/map-vehicle.component';
import { PitstopViewComponent } from './pitstop-view/pitstop-view.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrderAheadComponent } from './order-ahead/order-ahead.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';
import { ProfileComponent } from './profile/profile.component'
import { PitstopLandingComponent } from './pitstop-landing/pitstop-landing.component';
import { PitstopRestaurantComponent } from './pitstop-restaurant/pitstop-restaurant.component';
import { AddAddressComponent } from './address/add-address/add-address.component'
import { AfterPaymentComponent } from './after-payment/after-payment.component';
import { OrderListComponent } from "./order-list/order-list.component"

export const CustomerAppRoutes: Routes = [
  { path: 'cart-view', component: CartViewComponent },
  { path: 'care', component: CustomerCareComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'order-placed', component: AfterPaymentComponent },
  {
    path: '',
    component: CustomerLayoutComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'pitstop-landing', component: PitstopLandingComponent },
      { path: 'pitstop-restaurant', component: PitstopRestaurantComponent },
      { path: 'pitstop/:openType', component: PitstopViewComponent },
      { path: 'pitstop', component: PitstopViewComponent },
      { path: 'quick-preorder', component: PreOrderComponent },
      { path: 'quick-pickup', component: PreOrderComponent },
      { path: 'order-ahead', component: OrderAheadComponent },
      { path: 'delivery', component: OrderDeliveryComponent},
      { path:'order-history', component: OrderListComponent },
      { path: 'take-away', component: MapVehicleComponent},
      { path: 'address/add', component: AddAddressComponent},
      { path: '', component: MapVehicleComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
