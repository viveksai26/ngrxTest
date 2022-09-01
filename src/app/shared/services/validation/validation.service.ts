import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  userNameAsyncValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.checkIfUserNameExists(control.value).pipe(
        map((data) => (data ? {usernameAlreadyExists: true } : {usernameAlreadyExists: false}))
      );
    };
  }

  checkIfUserNameExists(value: string) {
    return of(value === 'vivek').pipe(delay(1000));
  }
}
