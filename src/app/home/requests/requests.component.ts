import { Component, OnInit } from '@angular/core';
import { HttprequsetService } from 'src/app/share/httprequset.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  loadingdata = false
  RequestsList:any[];
  constructor( private requestService: HttprequsetService,) { }

  ngOnInit(): void {
    this.GetRequestsList();
  }
  GetRequestsList(){
    this.requestService.OnGetRequests()
    .subscribe(
      response => {
        this.loadingdata= true;
        const jsonValue = JSON.stringify(response);
        const valueFromJson = JSON.parse(jsonValue);
        this.RequestsList = (valueFromJson || {}).result
        console.log(this.RequestsList)
      },
      error => {

      });
  }
  onDetailsiClick(id:number){
  }
  onApproveClick(id:number){

  }
  }
