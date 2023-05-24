import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected buttonLabel = 'Success Button Label';

  onButtonClick(alertMessage: string): void {
    alert(alertMessage);
  }
}
