import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(html: string): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(html);
  }
}
