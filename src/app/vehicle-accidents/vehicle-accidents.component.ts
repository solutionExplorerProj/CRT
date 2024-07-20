import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from '../dynamic-form/question-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-accidents',
  templateUrl: './vehicle-accidents.component.html',
  styleUrls: ['./vehicle-accidents.component.scss']
})
export class VehicleAccidentsComponent  {

  selectedJson: string = '';
  showButtons: boolean = true; // Initially show the buttons
  constructor(private router: Router) {}
  
    showTermsSection: boolean = false;
    acceptedTerms: boolean = false;
    formSubmitted: boolean = false;
    showTerms = false; 
    showForm = false;
   
  
  loadJson(): void {
    this.showButtons = false; 
    this.showTerms = true;
  }
  
  proceed() {
    this.formSubmitted = true;
    const termsCheckbox = (document.getElementById('terms-checkbox') as HTMLInputElement);
    this.acceptedTerms = termsCheckbox.checked;
    if (this.acceptedTerms) {
      this.showTerms = false;
      this.showForm = true;
    }
  }
  navigateToVehicleAccidents() {
    this.router.navigate(['/dynamic']);
  }
  
  
  
  
  toggleButtons(formActive: boolean): void {
    this.showButtons = !formActive; // Toggle buttons based on form's active state
  }

  
}