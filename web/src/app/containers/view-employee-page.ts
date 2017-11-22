import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as employee from '../actions/employee';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Employee Page's responsibility is to map router params
 * to a 'Select' employee action. Actually showing the selected
 * employee remains a responsibility of the
 * SelectedEmployeePageComponent
 */
@Component({
  selector: 'bc-view-employee-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-employee-page></bc-selected-employee-page>
  `
})
export class ViewEmployeePageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<number>('id')
      .map(id => new employee.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
