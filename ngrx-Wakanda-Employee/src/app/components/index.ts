import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail';
import { EmployeePreviewComponent } from './employee-preview';
import { EmployeePreviewListComponent } from './employee-preview-list';
import { EmployeeSearchComponent } from './employee-search';

import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item'; 
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';


export const COMPONENTS = [
  EmployeeSearchComponent,
  EmployeeDetailComponent,
  EmployeePreviewComponent,
  EmployeePreviewListComponent,
  EmployeeSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
