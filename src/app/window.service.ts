import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {

  get windowRef() {
    return window
  }
  // constructor(public afAuth: AngularFireAuth) {}
  // private currentUser: firebase.User = null;
  // isLoggedIn() {
  //   if (this.currentUser == null) {
  //     return false;
  //   }
  //   return true;
  // }

  // logout() {
  //     this.afAuth.auth.signOut();
  //   }

}