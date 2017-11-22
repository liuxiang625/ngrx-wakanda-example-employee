import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../models/employee';
import { Wakanda } from '../wakanda.service';


@Injectable()
export class EmployeesService {

  private _ds: any; 
  
  constructor(private http: Http, public wakanda: Wakanda) {
  	this.wakanda.getCatalog().then(ds => this._ds = ds);
  }


  searchEmployees(queryTitle: string): Observable<Employee[]>{  	
	return Observable.fromPromise(this._ds['Employee']
	  .query({
	  	filter: "firstName = :1 or lastName = :1",
	  	params: [queryTitle.toString() + "*"], 
	  	orderBy: "firstName"
	  }))
	  .map(result =>result['entities']);
  }

  retrieveEmployee(volumeId: number): Observable<Employee> {
  	return Observable.fromPromise(this._ds['Employee'].find(volumeId))
  }
  
}
