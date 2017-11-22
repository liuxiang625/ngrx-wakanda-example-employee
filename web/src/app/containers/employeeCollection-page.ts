import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { Employee } from '../models/employee';


@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Team</md-card-title>
    </md-card>

    <bc-employee-preview-list [employees]="employees$ | async"></bc-employee-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class EmployeeCollectionPageComponent {
  employees$: Observable<Employee[]>;

  constructor(store: Store<fromRoot.State>) {
    this.employees$ = store.select(fromRoot.getEmployeeCollection);
  }
}
