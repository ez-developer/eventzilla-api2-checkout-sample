import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import 'rxjs/add/operator/map';


let mytoken = "SHIj0Dvh3TaNXxQULYK8DeounjDJkFN7tnHTWqUa";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': mytoken
  })
}
let eventid = 2138719424;
let dateid = 2138453919;
var GetUrl = " https://www.eventzillaapi.net/api/v2/checkout/prepare"
var Posturl ="https://www.eventzillaapi.net/api/v2/checkout/create";
var Fillurl = "https://www.eventzillaapi.net/api/v2/checkout/fillorder";
var confirmurl = " https://www.eventzillaapi.net/api/v2/checkout/confirm";
 

@Injectable({
  providedIn: 'root'
})

  export class DataloadService {

    constructor(private http: HttpClient) { }
public api_url:string = GetUrl;
getUsers(): Observable<any> {
      return this.http.get<any[]>(this.api_url+"/"+eventid+"/"+dateid, httpOptions);
       
    }

  checkoutcreate(datas): Observable<any> {
    console.log(datas);
    return this.http.post<any>( Posturl, JSON.stringify(datas), httpOptions);
      
  }
  checkoutfillorder(fill): Observable<any> {
    console.log(fill);
    return  this.http.post<any>(Fillurl,JSON.stringify(fill),httpOptions);
  }
   checkoutconfirmorder(confirm):Observable<any>{
     console.log(confirm);
     return this.http.post<any>(confirmurl,JSON.stringify(confirm),httpOptions);
   }
  }