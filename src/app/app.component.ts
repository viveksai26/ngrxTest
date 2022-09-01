import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  combineLatest,
  concat,
  forkJoin,
  from,
  merge,
  Observable,
  of,
  zip,
} from 'rxjs';
import {
  combineAll,
  concatMap,
  debounceTime,
  delay,
  map,
  mergeAll,
  mergeMap,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ValidationService } from './shared/services/validation/validation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngrxTest';
  myForm: FormGroup = {} as FormGroup;
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {}
  ngOnInit() {
    this.createForm();
    this.myTest();
  }
  createForm() {
    this.myForm = this.fb.group({
      firstName: [
        null,
        [Validators.required, Validators.min(3)],
        [this.validationService.userNameAsyncValidation()],
        // [],
        // [this.validationService.userNameAsyncValidation()],
      ],
      lastName: [null, Validators.required],
    });

    this.myForm.valueChanges.pipe().subscribe((data) => {
      console.log(data);
      console.log(this.myForm.controls.firstName);
      if (data.firstName === 'vivek') {
        this.myForm.addAsyncValidators;
      }
    });
  }

  myTest() {
    const Observable1: Observable<string> = new Observable((ob) => {
      ob.next('Map1');
      ob.next('Map2');
      ob.next('Map3');
      ob.next('Map4');
      ob.next('Map5');
      ob.next('Map6');
      ob.next('Map7');
      ob.complete();
    });
    const Observable2: Observable<string> = new Observable((ob) => {
      ob.next('Map8');
      ob.next('Map9');
      ob.next('Map10');
      ob.next('Map11');
      ob.complete();
    });

    /**
     * Merge Map
     */

    /**
     * T1 - result - Null, Process - Map1, Map2, Map3
     * T2 - result - Map11, process - Map2, Map3
     * T3 - result - Map12 process - Map3
     *               Map21
     * T4 - result - Map13 process - Null
     *               Map22
     *               Map31
     * T5 - result - Map23 process - Null
     *               Map32
     *               Map33
     */
    Observable1.pipe(
      concatMap((x) => of(x).pipe(delay(1000))),
      mergeMap((val) => {
        return of('merge' + val + 1, 'merge' + val + 2, 'merge' + val + 3).pipe(
          concatMap((x) => of(x).pipe(delay(1000)))
        );
      })
    ).subscribe((data) => {
      // console.log(data);
    });

    /**
     * Concat Map
     */
    Observable1.pipe(
      concatMap((x) => of(x).pipe(delay(1000))),
      concatMap((val) => {
        return of(
          'concat' + val + 1,
          'concat' + val + 2,
          'concat' + val + 3
        ).pipe(concatMap((x) => of(x).pipe(delay(1000))));
      })
    ).subscribe((data) => {
      // console.log(data);
    });

    /**
     * Switch Map
     */
    of('switchMap', 'switchMap2', 'switchMap3')
      .pipe(switchMap((val) => of(val).pipe(delay(100))))
      .subscribe((data) => {
        // console.log(data);
      });

    /**
     * Fork Join
     */
    forkJoin([of('fork1'), of('fork2').pipe(delay(100))]).subscribe((data) => {
      // console.log(data)
    });

    /**
     * Zip
     */
    zip(
      Observable1,
      Observable2.pipe(concatMap((x) => of(x).pipe(delay(1000))))
    ).subscribe((data) => {
      // console.log('Zip', data);
    });

    /**
     * CombineLatest
     */
    combineLatest([Observable1, Observable2]).subscribe((data) => {
      // console.log('combineLatest', data);
    });

    /**
     * Merge
     */
    merge(
      Observable1.pipe(concatMap((x) => of(x).pipe(delay(100)))),
      Observable2
    ).subscribe((data) => {
      // console.log('merge', data);
    });

    /**
     * concat
     */
     concat(
      Observable1.pipe(concatMap((x) => of(x).pipe(delay(100)))),
      Observable2
    ).subscribe((data) => {
      console.log('concat', data);
    });
  }
}
