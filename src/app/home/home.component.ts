import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WindowService } from 'src/app/window.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage
  form:FormGroup
  successMessage
  val:any
  auths:any
  authvalue:any
  
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required]
     


    });
  }

  constructor(public af:AngularFireAuth,public router:Router,public fb:FormBuilder) {
    this.createForm()
  
    
  
   }

   phone(){
     this.router.navigateByUrl('/phone')
   }



  

   doGoogleLogin(){

    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.af.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Logged In";
        this.router.navigateByUrl('/log')
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      });
      
  
    
  
  }

  // onLogout(){
  //   this.authService.logout();
  //   console.log('logged')
  // }
  // //Check use is logged in
  // checkUserLoggedIn(){
  //   return localStorage.getItem('isLoggedIn') ? true : false;
  // }


 
  // tryRegister(value){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
  //     .then(res => {
  //       resolve(res);
  //     }, err => reject(err))
  //   })
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = "";
  //     this.successMessage = "Your account has been created";
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     this.successMessage = "";
  //   })
   
  // }

  submit(value){
    return new Promise<any>((resolve, reject) => {
      this.val=value.email
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res=>{
        resolve(res);
      }, err => reject(err))
         })
         .then(res => {
           console.log(res);
           this.errorMessage = "";
               this.successMessage = "Your account has been created";
               this.router.navigateByUrl('/log')
           })
           
      
    }

    

  
    // logout() {
    //   this.auth.logout();
    // }

    // isLoggedIn() {
    //   return this.auth.isLoggedIn();
    // }
  
  

  
  ngOnInit() {

    if(this.af.auth.currentUser.uid==null){
      this.auths=0;
    }
    else{
      this.auths=1;
      this.authvalue=this.af.auth.currentUser.email

    }
  }

}
