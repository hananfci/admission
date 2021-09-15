import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
];

@NgModule({
 // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
