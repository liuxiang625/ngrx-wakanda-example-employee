import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee';


@Component({
  selector: 'bc-employee-detail',
  template: `
    <md-card *ngIf="employee">
      <md-card-title-group>
        <img md-card-md-image *ngIf="photo" [src]="photo"/>
    	<md-card-title>{{fullName}}</md-card-title>
    	<md-card-subtitle *ngIf="title">Title: {{ title }}</md-card-subtitle>
    	<md-card-subtitle *ngIf="companyName">Company: {{companyName}}</md-card-subtitle>
      </md-card-title-group>
      <md-card-content>
    	<p> Age: {{age}}</p>
        <p>BirthDate: {{birthDate}}</p>
        <p>Country: {{country}}</p>
        <p>Salary: $ {{salary}}</p>
      </md-card-content>
      <md-card-actions align="start">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(employee)">
        Remove employee from Collection
        </button>
        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(employee)">
        Add employee to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 400px;
    }
    md-card-title-group {
      margin-left: 0;
    }
    img {
      max-width: 80px;
      max-height: 110px;
      margin-left: 5px;
    }
    md-card-content {
      margin: 15px 0 50px;
    }
    md-card-actions {
      margin: 25px 0 0 !important;
    }
    md-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `]
})
export class EmployeeDetailComponent {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() employee: Employee;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<Employee>();


  /**
   * Tip: Utilize getters to keep templates clean
   */
  get ID() {
    return this.employee.ID;
  }
  
  get age() {
    return this.employee.age;
  }
  get birthDate() {
  	return new Date(this.employee.birthDate).toLocaleDateString();
  }
  get gender() {
    return this.employee.gender;
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
  
  get country() {
  	return this.employee.country;
  }
  
  get salary() {
  	return this.employee.salary;
  }
  
  get photo(): string | boolean {
	    if (this.employee.photo) {
	      return this.employee.photo['uri'];
	  }
	}
}