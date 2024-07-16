import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleAccidentsComponent } from './vehicle-accidents/vehicle-accidents.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-gurd';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'accident',component:VehicleAccidentsComponent},
  {path:'dynamic',component:DynamicFormComponent},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'signup',component:SignUpComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
