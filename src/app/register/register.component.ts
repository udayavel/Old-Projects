import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage
  form:FormGroup
  successMessage

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required]
     


    });
  }
  tryRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigateByUrl('/home')
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    });

   
   
  }

  constructor(public af:AngularFireAuth,public router:Router,public fb:FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
  }

}
