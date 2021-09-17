import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttprequsetService } from 'src/app/share/httprequset.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-requestindex',
  templateUrl: './requestindex.component.html',
  styleUrls: ['./requestindex.component.css']
})
export class RequestindexComponent implements OnInit {
  loadingdata = false
  RequestsList:any[];
  postdata:boolean = false;
  closeResult: string;
  constructor(private ngbModal: NgbModal, private requestService: HttprequsetService,private router:Router,private route:ActivatedRoute,) { }

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

  openDeleteGruop(content,id:number) {

      this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result === 'yes') {
          debugger;
          this.postdata = true;
        this.requestService.onPut(id).subscribe(data => {
          console.log("approved")
            this.postdata = false;
          }, err => {
            console.log(err)
            this.postdata = false;
          });
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

  }