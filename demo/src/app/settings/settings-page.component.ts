import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonTitle,
  IonToggle,
  IonToolbar,
  Platform,
  IonListHeader,
} from '@demo/ionic';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonButtons,
    IonFooter,
    IonSearchbar,
    IonBackButton,
    IonAvatar,
    IonNote,
    IonItemGroup,
    IonToggle,
    IonListHeader,
  ],
})
export class SettingsPage {
  readonly platform = inject(Platform);
}
