import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { RequiredValidator } from './validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgFor,
  ],
})
export class UserFormComponent {
  constructor(private readonly _route: ActivatedRoute) {
    this.form.valueChanges.subscribe(console.log);
  }

  protected form = new FormGroup({
    name: new FormControl<string>('', {
      validators: RequiredValidator,
    }),
    username: new FormControl<string>('', {
      validators: Validators.required,
    }),
    email: new FormControl<string>('', {
      validators: Validators.email,
    }),
    company: new FormGroup({
      bs: new FormControl<string>(''),
      catchPhrase: new FormControl<string>(''),
      name: new FormControl<string>(''),
    }),
    addresses: new FormArray([this._createAddressForm()]),
  });

  protected get addresses(): FormGroup[] {
    return this.form.controls['addresses'].controls;
  }

  protected get canAddAddress(): boolean {
    return this.addresses.reduce(
      (acc: boolean, current: FormGroup) =>
        acc && current.valid,
      true
    );
  }

  protected get canRemoveAddress(): boolean {
    return this.addresses.length > 1;
  }

  protected addNewAddress(): void {
    this.form.controls['addresses'].push(
      this._createAddressForm()
    );
  }

  protected removeAddress(index: number): void {
    this.form.controls['addresses'].removeAt(index);
  }

  private _createAddressForm(): FormGroup {
    return new FormGroup({
      street: new FormControl('', {
        validators: Validators.required,
      }),
      city: new FormControl('', {
        validators: Validators.required,
      }),
    });
  }
}
