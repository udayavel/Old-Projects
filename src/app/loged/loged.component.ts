import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
// import {HomeComponent} from '../../app/home/home.component'
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.css'],
  providers: [AngularFireModule]
})
export class LogedComponent implements OnInit {


  per:any
  path:any
  view:Observable<any[]>

  data:any

  city:any

  first:any
  last:any
  work:any

  msg:any
  msgv:any

  form:FormGroup
  form1:FormGroup
  public doughnutChartData:number[]
  public pieChartData:number[] 

  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';
  

  createForm(){
    this.form=this.fb.group({
      first:['',Validators.required],
      last:['',Validators.required],
      work:['',Validators.required],
      city:['',Validators.required]
    })

    this.form1=this.fb.group({
      comment:["",Validators.required]
    })
  }

  comm(){

const comment = this.form1.value;
this.path= this.af.auth.currentUser.uid

this.afd.list('/messages/neutron/comments').set(this.path,comment);

this.msg=this.afd.list('/messages/neutron/comments/'+this.path).valueChanges()
this.msg.subscribe((items)=>{
  this.msgv=items[0];
  this.form1.reset()
})


  }
  submit(){

    const {first,last,work,city}=this.form.value

    // const date = new Date().getUTCDate;
    this.path= this.af.auth.currentUser.uid
    let formRequest={first,last,work,city}
    this.afd.list('/messages/neutron/').set(this.path,formRequest);

  }

 update(){

  this.last=null
  this.router.navigateByUrl('/log')
 }

  constructor(public af: AngularFireAuth,private router: Router,public fb:FormBuilder,private afd: AngularFireDatabase) {

   
    

    if( this.af.auth.currentUser.phoneNumber){
      console.log('hiiiii2')
      this.per= this.af.auth.currentUser.phoneNumber
    }else{
     
      this.per= this.af.auth.currentUser.email
      console.log(this.per)
    }
    this.createForm();

    this.path= this.af.auth.currentUser.uid
    console.log(this.path)
    this.view= this.afd.list('/messages/neutron/'+this.path).valueChanges()
    // this.view.subscribe(items => items.forEach(item => console.log(item)));
    this.view.subscribe((items) => {
      this.city=items[0],
      this.first=items[1],
      this.last=items[2],
      this.work=items[3]
     
      console.log(this.first)

      // this.doughnutChartData=[this.pant,this.shirt,45]
      // this.pieChartData=[this.pant,this.shirt,34]
      
    });

   

   
    
    
  
  
}
    
   
public doughnutChartLabels:string[] = ['Pant', 'Shirt', 'Mail-Order Sales'];

public doughnutChartType:string = 'doughnut';

public pieChartLabels:string[] = ['Pant', 'Shirt', 'Mail Sales'];

  public pieChartType:string = 'pie';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}


 
  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }



    

   
   
   
  
//    logout() {
//     console.log(this.af.auth.signOut());
//     console.log('logged out');
//     this.router.navigateByUrl('/home');
//  }

  ngOnInit() {

   
  }

}
