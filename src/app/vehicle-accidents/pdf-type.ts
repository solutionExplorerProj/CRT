import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-pdf',
  template: `
  <div>
    <h3>{{ to.heading }}</h3>
    <p>{{ to.text }}</p>
    <iframe [src]="sanitizedPdfUrl" width="70%" height="600px"></iframe>
    <button (click)="to.onNext()">Next</button>
  </div>
`,
})
export class PdfTypeComponent extends FieldType {
  sanitizedPdfUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.sanitizedPdfUrl = this.sanitizeUrl(this.to.pdfUrl);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
