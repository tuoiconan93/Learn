import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderComponent } from './order/order.component';
import { ServiceComponent } from './service/service.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { NeworderComponent } from './neworder/neworder.component';
import { CommonService } from './services/common.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PageNotFoundComponent,
    OrderComponent,
    ServiceComponent,
    FooterComponent,
    NeworderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,  
    ReactiveFormsModule
  ],
  providers: [CommonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
