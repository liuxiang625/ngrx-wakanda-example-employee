import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';   
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as employeeCollection from '../actions/employeeCollection';
import { Employee } from '../models/employee';


@Injectable()
export class CollectionEffects {

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('employees_app');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(employeeCollection.LOAD)
    .startWith(new employeeCollection.LoadAction())
    .switchMap(() =>
      this.db.query('employees')
        .toArray()
        .map((employees: Employee[]) => new employeeCollection.LoadSuccessAction(employees))
        .catch(error => of(new employeeCollection.LoadFailAction(error)))
    );

  @Effect()
  addEmployeeToCollection$: Observable<Action> = this.actions$
    .ofType(employeeCollection.ADD_EMPLOYEE)
    .map((action: employeeCollection.AddEmployeeAction) => action.payload)
    .mergeMap(employee =>  { 
    	var res = {};
		for (var property in employee) {
			if (typeof employee[property] != 'function' && typeof employee[property] != 'object') // taking all the function properties out of the employee
				res[property] = employee[property];
			else if (Object.prototype.toString.call(employee[property]) === '[object Date]')
				res[property] = employee[property].toString();
			else if (typeof employee[property] == 'object'){
				res[property] = {};
				for (var subProp in employee[property]){
					if (typeof employee[property][subProp] != 'function')
						res[property][subProp] = employee[property][subProp];
				}
			}
		}
    	return this.db.insert('employees', [ res ])
         .map(() => new employeeCollection.AddEmployeeSuccessAction(employee))
         .catch(() => of(new employeeCollection.AddEmployeeFailAction(employee)))
    });


  @Effect()
  removeEmployeeFromCollection$: Observable<Action> = this.actions$
    .ofType(employeeCollection.REMOVE_EMPLOYEE)
    .map((action: employeeCollection.RemoveEmployeeAction) => action.payload)
    .mergeMap(employee =>
      this.db.executeWrite('employees', 'delete', [ employee.ID ])
        .map(() => new employeeCollection.RemoveEmployeeSuccessAction(employee))
        .catch(() => of(new employeeCollection.RemoveEmployeeFailAction(employee)))
    );

    constructor(private actions$: Actions, private db: Database) { }
}
