import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleAccidentsComponent } from './vehicle-accidents/vehicle-accidents.component';

const routes: Routes = [
  {path:'accident',component:VehicleAccidentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
