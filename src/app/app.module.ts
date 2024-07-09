import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntimateImagesComponent } from './intimate-images/intimate-images.component';
import { VehicleAccidentsComponent } from './vehicle-accidents/vehicle-accidents.component';
import { SmallClaimsComponent } from './small-claims/small-claims.component';
import { StrataPropertyComponent } from './strata-property/strata-property.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { SocietiesAndCooperativeAssociationsComponent } from './societies-and-cooperative-associations/societies-and-cooperative-associations.component';
import { QuestionService } from './vehicle-accidents/question-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfTypeComponent } from './vehicle-accidents/pdf-type';
import { StaticTextComponent } from './vehicle-accidents/static-text';


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
    FormlyModule.forRoot(
      {
        types: [
          { name: 'pdf', component: PdfTypeComponent },
          { name: 'static-text', component: StaticTextComponent },
        ],
        
      }
    ), 
    FormlyMaterialModule,  
    ReactiveFormsModule,
    BrowserAnimationsModule,
   
    HttpClientModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
