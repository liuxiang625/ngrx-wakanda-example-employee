import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as employeeCollection from '../actions/employeeCollection';
import { Employee } from '../models/employee';


@Component({
  selector: 'bc-selected-employee-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-employee-detail
      [employee]="employee$ | async"
      [inCollection]="isSelectedEmployeeInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-employee-detail>
  `
})
export class SelectedEmployeePageComponent {
 employee$: Observable<Employee>;
  isSelectedEmployeeInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.employee$ = store.select(fromRoot.getSelectedEmployee);
    this.isSelectedEmployeeInCollection$ = store.select(fromRoot.isSelectedEmployeeInCollection);
  }

  addToCollection(employee: Employee) {
    this.store.dispatch(new employeeCollection.AddEmployeeAction(employee));
  }

  removeFromCollection(employee: Employee) {
    this.store.dispatch(new employeeCollection.RemoveEmployeeAction(employee));
  }
}
