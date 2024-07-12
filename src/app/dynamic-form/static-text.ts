import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-static',
  template: `
     <div>
      <h3 [innerHTML]="to.heading"></h3>
      <h4 [innerHTML]="to.subheading"></h4>
      <p [innerHTML]="to.content"></p>
    
    </div>
  `,
})
export class StaticTypeComponent extends FieldType {}
