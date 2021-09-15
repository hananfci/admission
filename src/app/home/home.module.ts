import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing-module';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    HomeRoutingModule,
    NgbModule
  ],
  declarations: [

  IndexComponent,

  FooterComponent,

  HeaderComponent],
exports: [

],
  providers: [

  ],
})
export class HomeModule { }
