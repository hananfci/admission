import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttprequsetService } from 'src/app/share/httprequset.service';
@Component({
  selector: 'app-requestindex',
  templateUrl: './requestindex.component.html',
  styleUrls: ['./requestindex.component.css']
})
export class RequestindexComponent implements OnInit {
  loadingdata = false
  RequestsList:any[];
  constructor( private requestService: HttprequsetService,private router:Router,private route:ActivatedRoute,) { }

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
    this.router.navigate([ id ],{relativeTo: this.route})
  }

  onApproveClick(id:number){

  }
  }