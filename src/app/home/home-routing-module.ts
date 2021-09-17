import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RequestdetailsComponent } from './requests/requestdetails/requestdetails.component';
import { RequestindexComponent } from './requests/requestindex/requestindex.component';
import { RequestsComponent } from './requests/requests.component';
const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  children: [
    {
      path: 'index',
      component: IndexComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'requests',
      component: RequestsComponent,
      children: [
        {path: '' , component: RequestindexComponent},
        {path: ':id' , component: RequestdetailsComponent},
      ]
    },

    {
      path: '',
      redirectTo: 'index',
      pathMatch: 'full',
    },





  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



  export class HomeRoutingModule { }



