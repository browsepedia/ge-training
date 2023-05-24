import { NgModule } from '@angular/core';
import { SuccessButtonComponent } from './success-button/success-button.component';
import { AlertButtonComponent } from './alert-button/alert-button.component';
import { ButtonLabelComponent } from './button-label/button-label.component';

@NgModule({
  declarations: [
    SuccessButtonComponent,
    AlertButtonComponent,
    ButtonLabelComponent,
  ],
  exports: [SuccessButtonComponent, AlertButtonComponent],
})
export class ButtonsModule {}
