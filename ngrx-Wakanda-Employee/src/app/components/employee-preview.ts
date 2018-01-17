import { Component, Input } from '@angular/core';
import { Employee } from '../models/employee';


@Component({
  selector: 'bc-employee-preview',
  template: `
    <a [routerLink]="['/employee', ID]">
      <md-card>
        <md-card-title-group>
        	<img md-card-md-image *ngIf="photo" [src]="photo"/>
        	<md-card-title>{{fullName}}</md-card-title>
        	<md-card-subtitle *ngIf="title">Title: {{ title }}</md-card-subtitle>
        	<md-card-subtitle *ngIf="companyName">Company: {{companyName}}</md-card-subtitle>	
        </md-card-title-group>
        <md-card-footer>
          
        </md-card-footer>
      </md-card>
    </a>
  `,
  styles: [`
    md-card {
      width:400px ;
      height: 150px;
      margin: 15px;
    }
    @media only screen and (min-width: 400px) and (max-width: 768px) {
      md-card {
        width: 350px;
        margin: 10px !important;
      }
    }
    @media only screen and (max-width: 400px){
      md-card {
        width: 300px;
        height: 170px;
        margin: 10px !important;
      }
    }
    md-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    md-card-title {
      margin-right: 10px;
    }
    md-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      max-width: 80px;
      max-height: 110px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding: 0 25px 25px;
    }
  `]
})
export class EmployeePreviewComponent {
  @Input() employee: Employee;

  get ID() {
    return this.employee.ID;
  }
  
  get title() {
    return this.employee.title;
  }

  get fullName() {
    return this.employee.fullName;
  }

  get companyName() {
    return this.employee.companyName;
  }

  get photo(): string | boolean {
    if (this.employee.photo) {
      return this.employee.photo['uri'];
  }

    return false;
  }
}
