import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import(`./customer-app/customer-app.module`).then(m => m.CustomerAppModule),
    data: { preload: true },
  },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
