import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';


export const ADD_EMPLOYEE =             '[Collection] Add Employee';
export const ADD_EMPLOYEE_SUCCESS =     '[Collection] Add Employee Success';
export const ADD_EMPLOYEE_FAIL =        '[Collection] Add Employee Fail';
export const REMOVE_EMPLOYEE =          '[Collection] Remove Employee';
export const REMOVE_EMPLOYEE_SUCCESS =  '[Collection] Remove Employee Success';
export const REMOVE_EMPLOYEE_FAIL =     '[Collection] Remove Employee Fail';
export const LOAD =                 '[Collection] Load';
export const LOAD_SUCCESS =         '[Collection] Load Success';
export const LOAD_FAIL =            '[Collection] Load Fail';


/**
 * Add Employee to Collection Actions
 */
export class AddEmployeeAction implements Action {
  readonly type = ADD_EMPLOYEE;

  constructor(public payload: Employee) { }
}

export class AddEmployeeSuccessAction implements Action {
  readonly type = ADD_EMPLOYEE_SUCCESS;

  constructor(public payload: Employee) { }
}

export class AddEmployeeFailAction implements Action {
  readonly type = ADD_EMPLOYEE_FAIL;
	
  constructor(public payload: Employee) { }
}


/**
 * Remove Employee from Collection Actions
 */
export class RemoveEmployeeAction implements Action {
  readonly type = REMOVE_EMPLOYEE;

  constructor(public payload: Employee) { }
}

export class RemoveEmployeeSuccessAction implements Action {
  readonly type = REMOVE_EMPLOYEE_SUCCESS;

  constructor(public payload: Employee) { }
}

export class RemoveEmployeeFailAction implements Action {
  readonly type = REMOVE_EMPLOYEE_FAIL;

  constructor(public payload: Employee) {}
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Employee[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddEmployeeAction
  | AddEmployeeSuccessAction
  | AddEmployeeFailAction
  | RemoveEmployeeAction
  | RemoveEmployeeSuccessAction
  | RemoveEmployeeFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
