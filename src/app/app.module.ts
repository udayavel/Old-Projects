import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LogedComponent } from './loged/loged.component';
import { RegisterComponent } from './register/register.component';
import { PhoneComponent } from './phone/phone.component';
import { WindowService } from './window.service';
import { AuthGaurd } from 'src/app/authguard.service';
import { AuthService } from 'src/auth.service';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ProductComponent } from './product/product.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpModule} from '@angular/http'
import { Appservice } from './Appservice.service';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { PaymentComponent } from './payment/payment.component';



// For MDB Angular Free


FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

// angular.module('myApp', ['stripe'])
// .config(function() {
//   Stripe.setPublishableKey('your-publishable-key');
// })


export const firebaseConfig = {
  apiKey: "AIzaSyDSNaxp6NFqytKtWd34OhvdwKM43vCWANM",
  authDomain: "fir-demo-d2b26.firebaseapp.com",
  databaseURL: "https://fir-demo-d2b26.firebaseio.com",
  projectId: "fir-demo-d2b26",
  storageBucket: "fir-demo-d2b26.appspot.com",
  messagingSenderId: "822749505590"
};  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogedComponent,
    RegisterComponent,
    PhoneComponent,
    ProductComponent,
    ProductinfoComponent,
    PaymentComponent
   
   
  ],
  imports: [
    AngularFirestoreModule,
    FusionChartsModule,
    ChartsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([{
    path:"home",
    component:HomeComponent  
    },
  {
    path:"log",
    component:LogedComponent

  },
{
  path:"register",
  component:RegisterComponent

},
{
  path:"phone",
  component:PhoneComponent

},
{
  path:'products',
  component:ProductComponent

},{
  path:'payment',
  component:PaymentComponent

}]),
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [WindowService,AuthService, AuthGaurd,Appservice],
  bootstrap: [AppComponent],


})
export class AppModule { }
