import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from '../dynamic-form/question-service';
@Component({
  selector: 'app-vehicle-accidents',
  templateUrl: './vehicle-accidents.component.html',
  styleUrls: ['./vehicle-accidents.component.scss']
})
export class VehicleAccidentsComponent  {

selectedJson: string = '';
showButtons: boolean = true; // Initially show the buttons

loadJson(filename: string): void {
  this.selectedJson = filename;
  this.showButtons = false; // Hide buttons when form is loading
}

toggleButtons(formActive: boolean): void {
  this.showButtons = !formActive; // Toggle buttons based on form's active state
}
}