import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveRequestService, LeaveRequest } from '../../services/leave-request';
import { EmployeeService } from '../../services/employee';
import { DepartmentService } from '../../services/department';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-request.html',
  styleUrls: ['./leave-request.scss']
})
export class LeaveRequestComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  // employees: any[] = [];
  // departments: any[] = [];

  currentLeave: LeaveRequest = {
    id: 0,
    employeeId: 0,
    departmentId: 0,
    startDate: '',
    endDate: '',
    reason: '',
    status: ''
  };

  isEditing = false;

  constructor(
    private leaveRequestService: LeaveRequestService,
    // private employeeService: EmployeeService,
    // private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadData();

  }

  loadData(): void{
    this.leaveRequestService.getAllLeaves().subscribe(data=>{
      this.leaveRequests= data;
    })
  }

  

  

  // loadEmployees(): void {
  //   this.employeeService.getAllEmployees().subscribe({
  //     next: (data) => (this.employees = data),
  //     error: (err) => console.error('Error loading employees:', err)
  //   });
  // }

  // loadDepartments(): void {
  //   this.departmentService.getAllDepartments().subscribe({
  //     next: (data) => (this.departments = data),
  //     error: (err) => console.error('Error loading departments:', err)
  //   });
  // }

  saveLeave(): void {
    if (!this.currentLeave.employeeId || !this.currentLeave.departmentId||! this.currentLeave.startDate
      ||!this.currentLeave.endDate||!this.currentLeave.reason||!this.currentLeave.status
    ) {
      alert('Please fill all the fields!.');
      return;
    }

    // console.log('Sending leave:', this.currentLeave);

    if ( this.isEditing) {
    this.leaveRequestService.updateLeave(this.currentLeave.id, this.currentLeave).subscribe({
      next:()=>{
        alert("Updated successfully")
        this.isEditing = false;
        this.loadData();
      },
      error:(err)=>{
        console.error("Error updating",err);
        alert("Failed to update Employee");

      }
    }); 
  }else {
    this.leaveRequestService.createLeave(this.currentLeave).subscribe({
      next:()=>{
        alert("Added successfully");
        // this.currentLeave = { id:0,firstName:'',lastName:'',email:'',jobTitle:'',departmentId : 0};
        this.loadData();
      },
      error:(err)=>{
        console.error("Failed Requesting for leave",err);
        alert("Cannot Request Leave, Try again later");
      }
    });
  }
  }

  editLeave(leave: LeaveRequest): void {
    this.currentLeave = { ...leave };
    this.isEditing = true;
  }

  deleteLeave(id: number): void {
    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveRequestService.deleteLeave(id).subscribe({
        next: () => {
          alert('Leave request deleted successfully!');
          this.loadData();
        },
        error: (err) => console.error('Error deleting leave request:', err)
      });
    }
  }

  resetForm(): void {
    this.currentLeave = {
      id: 0,
      employeeId: 0,
      departmentId: 0,
      startDate: '',
      endDate: '',
      reason: '',
      status: ''
    };
    this.isEditing = false;
  }
}
