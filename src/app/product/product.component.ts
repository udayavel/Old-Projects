import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {HttpModule, Http} from '@angular/http'
import { Appservice } from '../Appservice.service';
import { DISABLED } from '@angular/forms/src/model';

declare let paypal: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form:FormGroup

  pri:any
  pro:any
  speci:any
  urlc:any
  path:any
  per:any
  url:any
  data:any
  flag:any
  view:any
  comp:any
  count:any=0
  check:any
  store :Observable<any[]>
  spri:any
  sval:any
  def:Observable<any[]>
  defi0:any
  defi1:any
  defi2:any
  defi3:any
  defi4:any
  countany:any
  rest:any
  temp:any 
  views:any
  total=0
  amount:Observable<any[]>
  finala:any


  createForm(){

    this.form=this.fb.group({

      product:['',Validators.required],
      price:['',Validators.required],
      spec:['',Validators.required],
      urlvalue:['',Validators.required],
      pros:['',Validators.required]
    })
  }

  uploadPhoto(event:any){
   const file: File = event.target.files[0];
   

  //  this.path= this.af.auth.currentUser.uid
  //  console.log(this.path)
   const metaData = {'contentType':file.type};
   const storageRef: firebase.storage.Reference = firebase.storage().ref('/neutron/photos/'+file.name);
    storageRef.put(file,metaData).then(res=>{
    this.data=firebase.storage().ref('/neutron/photos/'+file.name).getDownloadURL().then(res=>{

      this.url=res;
      console.log(this.url)
    });
    
    });
   console.log('file uploading........',file.name)
   
   
   
  
  }

  booking(value:any,price:any,img:any){

    this.path= this.af.auth.currentUser.uid
    console.log(value)
    this.count=this.rest+1;
    const count1=this.count
    let formRequest={value,price,img}
    this.check=value
   
    this.afd.list('/messages/neutron/products/booked/'+this.path).set(value,formRequest);
    this.afd.list('/messages/neutron/products/bookedcount/'+this.path).set("count",count1);
    

    this.total=this.total+Number.parseInt(price);

  //   this.store=this.afd.list('/messages/neutron/products/booked/'+this.path).valueChanges()
    
  //  this.store.subscribe((items)=>{console.log(items[0].price)
  //   console.log("below")
  //   this.total=this.total+Number.parseInt(items[0].price)
  //   // this.total=this.total+Number.parseInt(items[i].price);
    const finala=this.total
    this.afd.list('/messages/neutron/products/invoice/'+this.path).set("cash",finala)
    //  this.amount=this.afd.list('/messages/neutron/products/invoice/'+this.path).valueChanges()
    //  this.amount.subscribe((res)=>{console.log(res[0])
    //  this.finala=res[0]});

    
    // })
  // });


  }
  payment(product:any,urlvalue:any,price:any){

  let formRequest={product,urlvalue,price};
  this.afd.list('/messages/neutron/products/payment/').set(this.path,formRequest);
  this.router.navigateByUrl('/payment');


  }
  remove(sto:any,val:any){

   this.finalAmount=this.finalAmount-val;
   this.afd.list('/messages/neutron/products/booked/'+this.path).remove(sto)
   this.count=this.rest-1
  //  const count1=this.count

  this.afd.list('/messages/neutron/products/bookedcount/'+this.path).set("count",this.count);

console.log("mine");
console.log(this.finalAmount)

  this.afd.list('/messages/neutron/products/invoice/'+this.path).set("cash",this.finalAmount)
  this.amount=this.afd.list('/messages/neutron/products/invoice/'+this.path).valueChanges()
  this.amount.subscribe((res)=>{console.log(res[0])
  this.finala=res[0]});

  this.total=this.finalAmount
  //  this.afd.list('/messages/neutron/products/invoice/'+this.path).set("cash",this.finalAmount)
  }
  info(produ:any){

    console.log("inside")
    this.views= this.afd.list('/messages/neutron/products/Shirt/'+produ).valueChanges()
    this.views.subscribe((items) => {

      this.temp=items[3]
    console.log(items)
      
    
    })
  }

  
  submit(){
  
   
    console.log(this.url)
    const {product,price,spec,pros} =this.form.value
    const urlvalue =this.url


    this.path= this.af.auth.currentUser.uid
    let formRequest={product,price,spec,urlvalue,pros}
    this.afd.list('/messages/neutron/products/'+pros).set(product,formRequest);



  }
  constructor(public af: AngularFireAuth,private router: Router,public fb:FormBuilder,private afd: AngularFireDatabase,private dataService:Appservice) {

    
    this.dataService.product().subscribe(com=>{

      this.comp=com;
    });


    this.path= this.af.auth.currentUser.uid
    console.log(this.path)
    if(this.path=='hX8gTQH8zlZjf5uOJg3aMu8umOA3'){


      this.flag=1
    }
    if( this.af.auth.currentUser.phoneNumber){
      console.log('hiiiii2')
      this.per= this.af.auth.currentUser.phoneNumber
    }else{
     
      this.per= this.af.auth.currentUser.email
      console.log(this.per)
    }
   this.createForm();

   this.store=this.afd.list('/messages/neutron/products/booked/'+this.path).valueChanges()
    let i=0;
   this.store.subscribe((items)=>{console.log(items)})


  //  this.path= this.af.auth.currentUser.uid
  //   console.log(this.path)
    this.view= this.afd.list('/messages/neutron/products/Shirt').valueChanges()
    this.view.subscribe((items) => {
      
     
    })

    this.amount=this.afd.list('/messages/neutron/products/invoice/'+this.path).valueChanges()
    this.amount.subscribe((res)=>{console.log(res[0])
    this.finalAmount=res[0]});


    this.countany=this.afd.list('/messages/neutron/products/bookedcount/'+this.path).valueChanges();
    this.countany.subscribe(items=>{
      if(items[0])
      {

      this.rest=items[0]

      }else{

        this.rest=0
      }

      console.log('country items'+items[0])
    })
    // console.log('countryyyy'+this.countany[0])

    
    this.amount=this.afd.list('/messages/neutron/products/invoice/'+this.path).valueChanges()
    this.amount.subscribe((res)=>{console.log(res[0])
    this.finala=res[0]});


   }




   finalAmount: number;
   addScript: boolean = false;
   paypalLoad: boolean = true;


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
 

  ngOnInit() {

    // console.log('count........'+this.count)
    // console.log('count22'+count)
    
  }

}
