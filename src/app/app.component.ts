import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataloadService} from './dataload.service';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent {

  prepareinput:any;
  events:any;
  tickettype_id:any;
  datas:any;
  eventid = 2138719424;
  eventdateid = 2138453919;
  createorderresponse:any;
  checkout_id:any;
  TicketPrice_id:any;
  fill :any;
  fillorderresponse:any;
  paymentid:any;
  confirm:any;
  divprepare=false;
  divcreate=false;
  divfillorder =false;
  divconfirm=false;
  divcreateresponse=false;
  divprepareresponse=true;
  divfillorderresponse =false;
  divconfirmresponse=false;
  confirmorderresponse:any;
question_id_1:any
question_id_2:any;

  constructor(private load: DataloadService) {}

  getDataServer() {
    let obj = this.load.getUsers();
 
    obj.subscribe(data => {this.events = data;
  
    console.log(this.events)
    this.tickettype_id = this.events.tickettypes[0].ticket_type_id;
    this.paymentid = this.events.payment_options[0].payment_id;
    this.question_id_1 = this.events.questions[0].question_id;
    this.question_id_2 = this.events.questions[1].question_id;
    console.log(this.tickettype_id);
    this.prepareinput = {
      "eventid": 2138719424,
      "eventdateid": 2138453919
    };  
    this.datas = {
      "eventid":this.eventid,
    "eventdateid":this.eventdateid,
    "ticket_types":[
        {
            "ticket_type_id":this.tickettype_id,
            "quantity":1
        }
    ]
    }

    })
  };
    
  ngOnInit() {this.getDataServer();
  
  
  } 

 onprepareorder(){
  this.divprepare = true;
     this.divcreate = true;
    this.divfillorder = false;
    this.divconfirm =false;
    this.createorderresponse = '';
    this.fillorderresponse = "";
    this.confirmorderresponse = "";
  }
  oncreateorder(){
   
this.load.checkoutcreate(this.datas).subscribe(Response =>{
     this.createorderresponse = Response;
     
     console.log(this.createorderresponse);
     this.checkout_id = this.createorderresponse.checkout_id;
     console.log(this.checkout_id);
      this.TicketPrice_id = this.createorderresponse.tickets[0].ticket_price_id;
      console.log(this.TicketPrice_id);
    this.fill = {
       "eventid":this.eventid,
    "eventdateid":this.eventdateid,
    "checkout_id":this.checkout_id,	 
    "buyerdetails": [
        {	 
            "buyer_first_name": "Dane",	 	 
            "buyer_last_name": "Joe", 
            "buyer_email" :"danejoe@xyz.com",	 	 
           
        
        }
       
        
    ],	 	 	 
    "tickets":[{
		"ticket_price_id" :this.TicketPrice_id,
        "first_name":"Max", 	 	 
        "last_name":"well",	 	 	 
        "email":"john@xyz.com",
        "answers":[
            {	 	 
                "question_id": this.question_id_1,	 	 	 
                "answer_text":"+1-888-817-2837"
            },
              {	 	 
                "question_id": this.question_id_2,	 	 	 
                "answer_text":"545 Metro Place South, One Metro Place, Suite 100, Dublin, OH 43017"
            }
           
        ]	 
      
    }]	 ,	 	 
    "payment_id": this.paymentid 

    }
  
     this.confirm ={
        "eventid":this.eventid,
    "eventdateid":this.eventdateid,
    "checkout_id":this.checkout_id,
    "payment_status":"success"
     }

    
   } )
   this.divprepare = true;
    this.divcreate = true;
    // this.divcreate =false;
    this.divcreateresponse =true;
    //  this.divcreateresponse =false;
    this.divfillorder = true;
    this.divfillorderresponse = false;

    this.divconfirm =false;
    this.divconfirmresponse = false;
  }
  onfillorder(){
    this.load.checkoutfillorder(this.fill).subscribe(_fillorder =>{
      this.fillorderresponse =_fillorder;
      console.log(this.fillorderresponse);
    })
     this.divfillorder = true;
    this .divfillorderresponse =true;
    this.divconfirm =true;
    this.divconfirmresponse=false;
  }
  onconfirmorder(){
    
this.load. checkoutconfirmorder(this.confirm).subscribe(_confirmorder =>{
      this.confirmorderresponse =_confirmorder;
      console.log(this.confirmorderresponse);
    })
    this.divconfirmresponse =true;
  }
}