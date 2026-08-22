import { Component } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@demo/ionic';
import { docsContentHtml } from './docs-content.generated';
import { SafeHtmlPipe } from './safe-html.pipe';

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, SafeHtmlPipe],
})
export class DocsPage {
  readonly docsContentHtml = docsContentHtml;
}
