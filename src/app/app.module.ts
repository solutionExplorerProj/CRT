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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { PdfTypeComponent } from './dynamic-form/pdf-type';
import { StaticTypeComponent } from './dynamic-form/static-text';
import { QuestionService } from './dynamic-form/question-service';
import { MatRadioModule } from '@angular/material/radio';
import { SafeUrlPipe } from './dynamic-form/safe-url-pipe';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    IntimateImagesComponent,
    VehicleAccidentsComponent,
    SmallClaimsComponent,
    StrataPropertyComponent,
    SocietiesAndCooperativeAssociationsComponent,
    DynamicFormComponent,
    SafeUrlPipe,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    FormlyModule.forRoot(
      {
        types: [
          { name: 'pdf', component: PdfTypeComponent },
          { name: 'static', component: StaticTypeComponent },
        ],
        
      }
    ), 
    FormlyMaterialModule,  
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
