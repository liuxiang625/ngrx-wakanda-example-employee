import { Routes } from '@angular/router';


import { EmployeeExistsGuard } from './guards/employee-exists';
import { FindEmployeePageComponent } from './containers/find-employee-page';
import { ViewEmployeePageComponent } from './containers/view-employee-page';
import { EmployeeCollectionPageComponent } from './containers/employeeCollection-page';
import { NotFoundPageComponent } from './containers/not-found-page';


export const routes: Routes = [
  {
    path: '',
    component: EmployeeCollectionPageComponent
  },
  {
    path: 'employee/find',
    component: FindEmployeePageComponent
  },
  {
    path: 'employee/:id',
    canActivate: [ EmployeeExistsGuard ],
    component: ViewEmployeePageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
