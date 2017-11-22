import { Component, Input } from '@angular/core';
import { Employee } from '../models/employee';

@Component({
  selector: 'bc-employee-preview-list',
  template: `
    <bc-employee-preview *ngFor="let employee of employees" [employee]="employee"></bc-employee-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class EmployeePreviewListComponent {
  @Input() employees: Employee[];
}
