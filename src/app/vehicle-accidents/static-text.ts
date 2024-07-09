import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-static-text',
  template: `
    <div>
      <h1>{{ to.heading }}</h1>
      <h3>{{ to.smallHeading }}</h3>
      <p>{{ to.content }}</p>
    </div>
  `,
})
export class StaticTextComponent extends FieldType {}
