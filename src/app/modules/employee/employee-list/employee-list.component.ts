import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { newArray } from '@angular/compiler/src/util';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  // @Output() toggle = new EventEmitter<boolean>();

  //create class to store data
  allEmployee: Employee[];
  // isfavorite: boolean = false;

  constructor(
    public service: EmployeeService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getAllEmployee();
  }

  //create method to get data from service and this method for only this component
  getAllEmployee() {
    //.subscibe() method used to get obervable and inside subscribe method we can use multiple method 
    //and a pure function and using arrow function
    // this.service.getAllEmployee().subscribe(
    //   (data: Employee[]) => {
    //     // console.log(data);
    //     // this.allEmployee = data;
    //     setTimeout(() => {
    //       this.allEmployee = data;
    //       this.spinnerService.hide();
    //     }, 1000);
    //   });
    //Remove subscribe methoda //
    // this.allEmployee = this.service.getAllEmployee();
    this.service.getAllEmployee();

  }

  //for delete
  deleteEmp(id: number) {
    //console.log("Delete works");
    //console.log(abc);
    this.service.deleteEmployee(id).subscribe(
      (employee: Employee) => {
        this.getAllEmployee();
        this.toastrService.error("Employee Deleted Sucessfully", '');
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide()
        }, 1000);
      }
    );
  }

  //edit employee
  editEmp(employee: Employee) {
    console.log(employee);
    // this.service.currentEmployee = employee;
    this.service.currentEmployee = Object.assign({}, employee);
    this.toastrService.warning("You are editing the employee details", '');
  }

  onFavoriteClick(employee: Employee) {
    // this.isfavorite = !this.isfavorite;
    console.log(employee);
    if (employee.isfavorite) {
      employee.isfavorite = false;
    }
    else {
      employee.isfavorite = true;
    }
  }
}

