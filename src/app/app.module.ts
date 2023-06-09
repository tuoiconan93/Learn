  import { APP_INITIALIZER,NgModule } from '@angular/core';
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
  import { HttpServerService } from './services/http-server.service';
  import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  // import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
  import { KeycloakService } from './services/keycloak.service';
  // function initializeKeycloak(keycloak: KeycloakService) {
  //   return () =>
  //     keycloak.init({
  //       config: {
  //         url: 'https://localhost:8443',
  //         realm: 'rieker',
  //         clientId: 'orderrieker'
  //       },
  //       initOptions: {
  //         onLoad: 'login-required',
  //         flow:"standard"
  //       }
  //     });
  // }
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
      ReactiveFormsModule,
      BsDatepickerModule,
      BrowserAnimationsModule,
      // KeycloakAngularModule,
  
    ],
    providers: [
      HttpServerService,
      KeycloakService,
      // {
      //   provide: APP_INITIALIZER,
      //   useFactory: initializeKeycloak,
      //   multi: true,
      //   deps: [KeycloakService]
      // }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
