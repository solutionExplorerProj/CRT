import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleAccidentsComponent } from './vehicle-accidents/vehicle-accidents.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-gurd';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IntimateImagesComponent } from './intimate-images/intimate-images.component';
import { SmallClaimsComponent } from './small-claims/small-claims.component';
import { StrataPropertyComponent } from './strata-property/strata-property.component';
import { SocietiesAndCooperativeAssociationsComponent } from './societies-and-cooperative-associations/societies-and-cooperative-associations.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'accident',component:VehicleAccidentsComponent},
  {path:'dynamic',component:DynamicFormComponent},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'signup',component:SignUpComponent},
  {path:'accident',component:VehicleAccidentsComponent},
  {path: 'IntimateImagesComponent', component: IntimateImagesComponent},
  {path: 'SmallClaimsComponent', component: SmallClaimsComponent},
  {path: 'StrataPropertyComponent', component: StrataPropertyComponent},
  {path: 'SocietiesAndCooperativeAssociationsComponent', component: SocietiesAndCooperativeAssociationsComponent},
  {path:'home',component:HomeComponent},
  { path: '**', redirectTo: 'login' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
