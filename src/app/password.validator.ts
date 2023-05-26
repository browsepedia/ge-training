import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export const PasswordMatchValidator: (
  firstControlName: string,
  secondControlName: string
) => ValidatorFn =
  (firstControlName: string, secondControlName: string) =>
  (control: AbstractControl) => {
    console.log('PasswordMatchValidator');
    if (control && control instanceof FormGroup) {
      const firstControl =
        control.controls[firstControlName];
      const secondControl =
        control.controls[secondControlName];

      if (
        firstControl &&
        secondControl &&
        firstControl.value === secondControl.value
      ) {
        return null;
      }
    }
    return {
      matches: true,
    };
  };
