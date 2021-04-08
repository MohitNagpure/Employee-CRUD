import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'
import { EmployeeService } from '../../services/employee.service';
import { from } from 'rxjs';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [EmployeeComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    EmployeeComponent,
    EmployeeListComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
