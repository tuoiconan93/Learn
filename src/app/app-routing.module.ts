import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NeworderComponent } from './neworder/neworder.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'order', component: OrderComponent,canActivate: [AuthGuard] },
  { path: 'service', component: ServiceComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'neworder', component: NeworderComponent,canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
