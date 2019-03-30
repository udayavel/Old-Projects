import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {HttpModule, Http} from '@angular/http'

declare let paypal: any;



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  path:any
  def:Observable<any[]>
  temp:any
  total=0;
  product:any
  price:any
  url:any

  
  finalAmount: number;



  // pay(rs:any){


  // this.finalAmount=rs;
   
  // }
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARs-oRHZRCa2NVe4Iv_FCItsduSBjMmghN893ykiIKDruD_XRoQyhLUu9R7TA-zJPAXMRCEK3oLoP8QY',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  remove(){

   
     
    this.afd.list('/messages/neutron/products/payment/').remove(this.path)
    this.router.navigateByUrl('/products')


  }

  constructor(public af: AngularFireAuth,private router: Router,public fb:FormBuilder,private afd: AngularFireDatabase) {

   this.path=af.auth.currentUser.uid;
   this.def=this.afd.list('/messages/neutron/products/payment/'+this.path).valueChanges();
   
  //  this.def.subscribe(res=>res.forEach(res=>{
    
  //   console.log(res.price)
    
  //   this.total=this.total+Number.parseInt(res.price)
  //   this.finalAmount=this.total;
  //   console.log(this.total);
  
  //  })
  
    this.def.subscribe((items)=>{

      this.price=items[0]
      this.product=items[1]
      this.url=items[2]

      this.finalAmount=this.price
    })


   }

  
}
