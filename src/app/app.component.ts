import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  form:FormGroup
  create(){
    this.form=this.fb.group({
      email:['',Validators.required],
      pass:['',Validators.required]
    })
  }
  constructor(private fb:FormBuilder,public router:Router,public af: AngularFireAuth){
    this.create();
    
  }

  logout() {
    console.log(this.af.auth.signOut());
    
    console.log('logged out');
    this.router.navigateByUrl('/home');
 }
  
}
