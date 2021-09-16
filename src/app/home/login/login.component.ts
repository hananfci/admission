import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttprequsetService } from 'src/app/share/httprequset.service';
import { IUser } from 'src/app/share/request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadingdata:boolean = false;
  loginObj:IUser
  Error:boolean = false;
  constructor(private _formBuilder: FormBuilder,private route:ActivatedRoute, private requestService: HttprequsetService,private router:Router,)  { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  onSubmit(){
    debugger;
    this.loadingdata = true;
    this.loginObj={
       userName: this.loginForm.value.userName,
       password:this.loginForm.value.password ,
       isadmin:true};
    this.requestService.onAuthenticate( this.loginObj).toPromise().then( res =>{const jsonValue = JSON.stringify(res);
    const valueFromJson = JSON.parse(jsonValue);

  this.loadingdata = false;

  this.router.navigate([`requests`],{relativeTo: this.route} );

  }).catch(err=>{
    this.loadingdata = false;
    console.log(err)
    this.Error=err.error.responseException.exceptionMessage;

   });

  }
}
