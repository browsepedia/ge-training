import { NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating-field',
  templateUrl: './star-rating-field.component.html',
  styleUrls: ['./star-rating-field.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => StarRatingFieldComponent
      ),
      multi: true,
    },
  ],
})
export class StarRatingFieldComponent
  implements ControlValueAccessor
{
  protected rating = 0;

  private _onChange!: (rating: number) => void;
  private _onTouch!: () => void;

  writeValue(newValue: number): void {
    this.rating = newValue;
  }

  registerOnChange(fn: (rating: number) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  protected onStarClick(
    event: MouseEvent,
    index: number
  ): void {
    const element = event.target as HTMLElement;
    const elementLeft = element.getBoundingClientRect().x;
    const elementWidth = element.clientWidth;

    const mouseXRelativeToElement =
      event.clientX - elementLeft;

    const isClickInLeftThird =
      mouseXRelativeToElement < elementWidth / 3;
    if (isClickInLeftThird) {
      this.rating = index;
    }

    const isClickInMiddleThird =
      mouseXRelativeToElement > elementWidth / 3 &&
      mouseXRelativeToElement < (elementWidth / 3) * 2;

    if (isClickInMiddleThird) {
      this.rating = index + 0.5;
    }

    const isClickInLastThird =
      mouseXRelativeToElement > (elementWidth / 3) * 2;
    if (isClickInLastThird) {
      this.rating = index + 1;
    }

    this._onChange(this.rating);
  }
}
