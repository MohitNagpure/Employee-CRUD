import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, Subscription } from 'rxjs';
import { Employee } from "../model/employee.model";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  firstName = 'mohit';
  //create url to fetch the data link
  urlApi: string = "http://localhost:3000/employee";
  allEmployee: Employee[] = [];

  currentEmployee: Employee = {
    firstName: '',
    lastName: '',
    designation: '',
    address: '',
    employeeCode: '',
    id: null,
    isfavorite:false
  }

  constructor(
    //create a refernce for access method i.e. get,put,post,delete
    private http: HttpClient,
    private spinnerService: NgxSpinnerService,
    private toastarService: ToastrService,
  ) { }

  //method to get all employee data
  // getAllEmployee(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.urlApi);
  // }

  getAllEmployee(): Subscription {
    return this.http.get<Employee[]>(this.urlApi).subscribe(
      (allEmp: Employee[]) => {
        // console.log(allEmp);
        this.allEmployee = allEmp;
        setTimeout(() => {
          this.spinnerService.hide();
        }, 1000);
      });
  }

  //delete method
  deleteEmployee(empID: number): Observable<Employee> {
    return this.http.delete<Employee>(this.urlApi + "/" + empID);
  }

  //create method
  createEmp(newEmp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.urlApi, newEmp);
  }

  //update method
  updateEmp(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.urlApi + '/' + emp.id, emp)
  }

}