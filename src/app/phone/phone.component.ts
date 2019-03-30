import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WindowService } from 'src/app/window.service';

export class PhoneNumber {
  country: string;
  // area: string;
  // prefix: string;
  // line: string;
  phone:string

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.phone 
    return `+${num}`
  }

}


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  form:FormGroup
  createForm() {
    this.form = this.fb.group({
      phone: ['', Validators.required]
    
     


    });
  }

  windowRef: any;

  number:any
  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  

  constructor(public af:AngularFireAuth,public router:Router,public fb:FormBuilder,private win: WindowService) {
    this.createForm()
    
   }
  ngOnInit() {

    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier
                  .render()
                  .then( widgetId => {

                    this.windowRef.recaptchaWidgetId = widgetId
  });

}

  

  sendLoginCode() {

   

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    

    firebase.auth()
            .signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;


    })
    .catch( error => console.log(error, "Incorrect code entered?"));
    this.router.navigateByUrl('/log')
    
  }





 

}
