import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee,EmployeeService } from '../../services/employee';


@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.html',
  standalone: true,
  styleUrls: ['./employee.scss']
})
export class EmployeeComponent implements OnInit {
  employees:Employee[] = [];
  currentEmployee:Employee = {id : 0,firstName :'',lastName: '',email:'',jobTitle: '',departmentId :0}
  isEditing = false;

  constructor(private employeeService: EmployeeService){};

  ngOnInit(): void {
    this.loadEmployees()
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data=>{
      this.employees=data;
    });
  }

  saveEmployee(): void{
    if(!this.currentEmployee.firstName||!this.currentEmployee.lastName|| !this.currentEmployee.email
      ||!this.currentEmployee.jobTitle|| !this.currentEmployee.departmentId
    ){
    alert("Please fill all the fields");
    return;
  }
    
  
  if ( this.isEditing) {
    this.employeeService.updateEmployee(this.currentEmployee.id, this.currentEmployee).subscribe({
      next:()=>{
        alert("Updated successfully")
        this.isEditing = false;
        this.currentEmployee = { id:0,firstName:'',lastName:'',email:'',jobTitle:'',departmentId : 0};
        this.loadEmployees();
      },
      error:(err)=>{
        console.error("Error updating",err);
        alert("Failed to update Employee");

      }
    }); 
  } else{
    this.employeeService.createEmployee(this.currentEmployee).subscribe({
      next:()=>{
        alert("Added successfully");
        this.currentEmployee = { id:0,firstName:'',lastName:'',email:'',jobTitle:'',departmentId : 0};
        this.loadEmployees();
      }, 
      error:(err)=>{
        console.error("Failed adding employee",err);
        alert("Cannot add Employee, Try again later");
      }
    });
  }
  }
  editEmployee(empl:Employee): void{
    this.currentEmployee={...empl};
    this.isEditing = true;
  }

  deleteEmployee(id: number): void{
    if(confirm("Are you sure you want to delete employee?")){
      this.employeeService.deleteEmployee(id).subscribe({
        next:()=>{
          alert("Deleted successfully");
           this.loadEmployees();

        }
      });
   
  }
  }
  cancelEdit():void{
    this.isEditing = false;
    this.currentEmployee = { id:0,firstName:'',lastName:'',email:'',jobTitle:'',departmentId : 0};

  }

}
