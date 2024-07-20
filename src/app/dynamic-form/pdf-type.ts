import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-pdf',
  template: `
    <div class="pdf-container">
      <h1>{{ to.heading }}</h1>
      <p>{{ to.text }}</p>
      <iframe [src]="sanitizedPdfUrl"></iframe>
    </div>
  `,
  styles: [`
    /* Center the container */
    .pdf-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 24px;
    }

    p {
      margin-bottom: 20px;
      font-size: 16px;
    }

    /* Style the iframe for PDF viewing */
    iframe {
      width: 80%;
      max-width: 800px;
      height: 180vh;
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for better focus */
    }

    /* Media queries for responsiveness */
    @media (max-width: 768px) {
      iframe {
        width: 100%;
        height: 60vh;
      }

      h1 {
        font-size: 20px;
      }

      p {
        font-size: 14px;
      }
    }
  `]
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
