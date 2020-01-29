import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomerStateService } from '../customer-state.service';
import { SignIn } from 'src/app/store/actions/customer.actions';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.states';
import { OrderService } from '../order.service';
import { MatBottomSheet } from '@angular/material';
import { CartNotEmptyComponent } from 'src/app/shared/shared-components/cart-not-empty/cart-not-empty.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit, OnDestroy {
  cartCount = 0;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private customerStateService: CustomerStateService,
    public router: Router,
    private cookieService: CookieService,
    private store: Store<IAppState>,
    private orderService: OrderService,
    private bottomSheet: MatBottomSheet,
    private location: Location,
  ) {}

  get isLoggedIn() {
    return true;
  }
  currentPage = 'main';
  headerChangeSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  ngOnInit() {
    this.headerChangeSubscription = this.customerStateService.currentPage$.subscribe(
      value => {
        this.currentPage = value;
      }
    );

    this.orderService.orderCount$.subscribe(res => {
      this.cartCount = res;
    });
  }

  ngOnDestroy(): void {
    this.headerChangeSubscription.unsubscribe();
  }

  onBackClick() {
    // TODO: This has to be previous url
    this.location.back();
  }

  onSideNavClick(item: string) {
    switch (item) {
      case 'Partner':
        this.router.navigate(['/oa/login']);
        break;
      case 'Logout':
        if (this.isLoggedIn) {
          this.store.dispatch(new SignIn(null));
          this.cookieService.setUserData(null);
          // Remove user and navigate to Login page.
        }
        this.router.navigate(['login-signup']);
        break;
      case 'Care':
        this.router.navigate(['/customer/care']);
        break;
      case 'Profile':
        this.router.navigate(['/customer/profile']);
        break;
      default:
        break;
    }
  }

  onNavigate(url: string) {
    // Check if cart has data
    if (this.cartCount && this.cartCount > 0 ) {
      const cartNotEmptyRef = this.bottomSheet.open(CartNotEmptyComponent);
      cartNotEmptyRef.afterDismissed().subscribe(res => {
        if (res) {
          sessionStorage.setItem('path', url);
          this.orderService.clearCart();
          this.router.navigate([url]);
        }
      });

    } else {
      sessionStorage.setItem('path', url);
      this.router.navigate([url]);
    }
  }

  onCartClick() {
    this.router.navigate(['customer/cart-view']);
  }
}
