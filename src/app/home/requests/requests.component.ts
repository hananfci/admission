import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttprequsetService } from 'src/app/share/httprequset.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  loadingdata = false
  RequestsList: any[];
  constructor(private requestService: HttprequsetService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.GetRequestsList();
  }
  GetRequestsList() {
    this.requestService.OnGetRequests()
      .subscribe(
        response => {
          this.loadingdata = true;
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.RequestsList = (valueFromJson || {}).result

        },
        error => {

        });
  }
  onDetailsiClick(id: number) {
    this.router.navigate([id], { relativeTo: this.route })
  }

  onApproveClick(id: number) {

  }
}
