import * as firebase from 'firebase';
//Import router
import { Router } from '@angular/router';
//Import Injectable
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService{
  constructor(private router: Router){}
//   signUp(email: string, password: string){
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then(
//         response => {
//           console.log("Successfull Sign up");
//         },
//         error => console.log(error)
//       )
//   }
//   signIn(email: string, password: string){
//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(
//       response => {   
//               this.router.navigate(['home']);
//               this.getCurrentUserToken(); 
              
//             },
//       error => console.log(error)
//     );
//   }
  logout(){
    firebase.auth().signOut();
    localStorage.removeItem('isLoggedIn');
  }
//   getCurrentUserToken(){
//     console.log(firebase.auth().currentUser.uid)
//     // .then(
//     //   (token: string) => {
//     //     localStorage.setItem('isLoggedIn', token);
//     //   }
//     //)
//     // localStorage.getItem('isLoggedIn');
//   }
  isAuthenticated(){
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }

  getname(){
      return firebase.auth().currentUser.uid
  }
}