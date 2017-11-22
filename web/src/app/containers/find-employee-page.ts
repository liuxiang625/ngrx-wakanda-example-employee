import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as employee from '../actions/employee';
import { Employee } from '../models/employee';


@Component({
  selector: 'bc-find-employee-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-employee-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></bc-employee-search>
    <bc-employee-preview-list [employees]="employees$ | async"></bc-employee-preview-list>
  `
})
export class FindEmployeePageComponent {
  searchQuery$: Observable<string>;
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).take(1);
    this.employees$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new employee.SearchAction(query));
  }
}
