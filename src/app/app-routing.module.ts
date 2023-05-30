import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NeworderComponent } from './neworder/neworder.component';

const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: 'service', component: ServiceComponent },
  { path: '', component: HomeComponent },
  { path: 'neworder', component: NeworderComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
