import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from "../../../model/employee.model";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public service: EmployeeService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // console.log(this.service.firstName)
  }

  //save employee data
  save(currentEmployee: Employee) {
    console.log(currentEmployee);
    if (currentEmployee.id == null) {
      console.log('Employee Created');
      this.createEmployee(currentEmployee);
    }
    else {
      console.log('Employee Updated')
      this.updateEmployee(currentEmployee);
    }
  }

  //create employee
  createEmployee(employee: Employee) {
    this.spinnerService.show();
    this.service.createEmp(employee).subscribe(
      (employee: Employee) => {
        this.service.getAllEmployee();
        this.toastrService.success("Employee create sucessfully", '');
        this.clear();
      }
    );
  }

  //update employee
  updateEmployee(employee: Employee) {
    this.spinnerService.show();
    this.service.updateEmp(employee).subscribe(
      (employee: Employee) => {
        this.service.getAllEmployee();
        this.toastrService.info("Employee update sucessfully", '');
        this.clear();
      }
    );
  }

  //clear record
  clear() {
    this.service.currentEmployee = {
      firstName: '',
      lastName: '',
      designation: '',
      address: '',
      employeeCode: '',
      id: null
    }
  }

}