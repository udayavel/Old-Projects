import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { map } from "rxjs/operators";
@Injectable()
export class Appservice {

    constructor(private http:Http){}

    product(){

       return this.http.get('./assets/product.json').pipe(map(res=>res.json()))
    }
}
