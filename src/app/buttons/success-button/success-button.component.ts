import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-success-button',
  templateUrl: './success-button.component.html',
  styleUrls: ['./success-button.component.scss'],
})
export class SuccessButtonComponent {
  @Input({ required: true }) public buttonLabel = '';

  @Output() public readonly buttonClick =
    new EventEmitter<string>();
}
