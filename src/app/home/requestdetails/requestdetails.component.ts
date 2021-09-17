import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttprequsetService } from 'src/app/share/httprequset.service';
@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.css']
})
export class RequestdetailsComponent implements OnInit {
  loadingdata = false
  requestDetails:any[];
  constructor( private requestService: HttprequsetService,private router:Router,private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.GetRequestsList();
  }
  GetRequestsList(){
   var  id = parseInt( this.route.snapshot.paramMap.get('id'));
    this.requestService.onGetRequest(id)
    .subscribe(
      response => {
        this.loadingdata= true;
        const jsonValue = JSON.stringify(response);
        const valueFromJson = JSON.parse(jsonValue);
        this.requestDetails = (valueFromJson || {}).result
        console.log(this.requestDetails)
      },
      error => {

      });
  }

}
