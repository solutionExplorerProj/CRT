import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntimateImagesComponent } from './intimate-images/intimate-images.component';
import { VehicleAccidentsComponent } from './vehicle-accidents/vehicle-accidents.component';
import { SmallClaimsComponent } from './small-claims/small-claims.component';
import { StrataPropertyComponent } from './strata-property/strata-property.component';
import { SocietiesAndCooperativeAssociationsComponent } from './societies-and-cooperative-associations/societies-and-cooperative-associations.component';

@NgModule({
  declarations: [
    AppComponent,
    IntimateImagesComponent,
    VehicleAccidentsComponent,
    SmallClaimsComponent,
    StrataPropertyComponent,
    SocietiesAndCooperativeAssociationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
