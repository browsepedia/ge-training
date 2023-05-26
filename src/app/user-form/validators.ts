import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const RequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control && !control.value) {
    return {
      required: true,
    };
  }

  return null;
};
