import { Component, OnInit } from '@angular/core';
import { Department, DepartmentService } from '../../services/department';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [FormsModule, CommonModule],
  templateUrl: './department.html',
  styleUrls: ['./department.scss'],
  standalone: true
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  currentDepartment: Department = { departmentId: 0, name: '', description: '' };
  isEditing = false;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  saveDepartment(): void {
    if (!this.currentDepartment.name || !this.currentDepartment.description) {
      alert("Please fill in all fields before saving.");
      return;
    }

    if (this.isEditing) {
      // Update existing department
      this.departmentService.updateDepartment(this.currentDepartment.departmentId, this.currentDepartment).subscribe({
        next: () => {
          alert("Updated successfully!");
          this.isEditing = false;
          this.currentDepartment = { departmentId: 0, name: '', description: '' };
          this.loadDepartments();
        },
        error: (err) => {
          console.error("Error updating department:", err);
          alert("Failed to update department.");
        }
      });
    } else {
      this.departmentService.createDepartment(this.currentDepartment).subscribe({
        next: () => {
          alert("Added successfully!");
          // this.currentDepartment = { departmentId: 0, name: '', description: '' };
           this.loadDepartments();
        },
        error: (err) => {
          console.error("Error adding department:", err);
          alert("Failed to add department.");
        }
      });
    }
  }

  editDepartment(dept: Department): void {
    this.currentDepartment = { ...dept };
    this.isEditing = true;
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          alert("Deleted successfully!");
          this.loadDepartments();
        },
        error: (err) => {
          console.error("Error deleting department:", err);
          alert("Failed to delete department.");
        }
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentDepartment = { departmentId: 0, name: '', description: '' };
  }
}
