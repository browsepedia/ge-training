import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PasswordMatchValidator } from './password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected buttonLabel = 'Success Button Label';

  protected passwordForm = new FormGroup(
    {
      password: new FormControl(''),
      confirm: new FormControl(''),
      name: new FormControl(''),
      rating: new FormControl(2),
    },
    {
      validators: PasswordMatchValidator(
        'password',
        'confirm'
      ),
    }
  );

  protected subject = new BehaviorSubject<string>(
    new Date().toISOString()
  );

  onButtonClick(alertMessage: string): void {
    console.log(alertMessage);
  }

  onClick(): void {
    this.subject.next(new Date().toISOString());

    this.subject.value;

    this.subject.subscribe(console.log);
  }
}
