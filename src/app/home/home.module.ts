import { NgModule  } from '@angular/core';
import { HomeRoutingModule } from './home-routing-module';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RequestsComponent } from './requests/requests.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RequestdetailsComponent } from './requests/requestdetails/requestdetails.component';
import { RequestindexComponent } from './requests/requestindex/requestindex.component';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],

  declarations: [
  IndexComponent,
  LoginComponent,
  RequestsComponent,
  RequestdetailsComponent,
  RequestindexComponent],

  providers: [

  ],
})
export class HomeModule { }
