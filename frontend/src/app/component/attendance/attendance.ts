import { Component, OnInit } from '@angular/core';
import { Attendance, AttendanceService } from '../../services/attendance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.scss']
})
export class AttendanceComponent implements OnInit {
  att: Attendance[] = [];
  isEditing = false;

  currentAttendance: Attendance = {
    attendanceId: 0,
    employeeId: 0,
    status: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    remarks: '',
    date:new Date()
  };

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.attendanceService.getAllAttendance().subscribe({
      next: (data) => (this.att = data),
      error: (err) => console.error('Error loading attendance:', err)
    });
  }

  onStatusChange(): void {
    if (
      this.currentAttendance.status === 'Leave' ||
      this.currentAttendance.status === 'Absent'
    ) {
      this.currentAttendance.checkInTime = null as any;
      this.currentAttendance.checkOutTime = null as any;
    } else if (this.currentAttendance.status === 'Present') {
      this.currentAttendance.checkInTime = new Date();
      this.currentAttendance.checkOutTime = new Date();
    }
  }

  saveAttendance(): void {
    const a = this.currentAttendance;

    if (!a.employeeId || !a.status ||!a.remarks) {
      alert('⚠️ Please fill all the fields.');
      return;
    }

    if (a.status !== 'Present') {
      a.checkInTime = null as any;
      a.checkOutTime = null as any;
    }


    if (this.isEditing) {
      this.attendanceService.updateAttendance(a.attendanceId, a).subscribe({
        next: () => {
          alert('✅ Updated Successfully');
          this.resetForm();
          this.loadAttendance();
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('❌ Update failed. Try again.');
        }
      });
    } else {
      this.attendanceService.createAttendance(a).subscribe({
        next: () => {
          alert('✅ Added Successfully');
          this.resetForm();
          this.loadAttendance();
        },
        error: (err) => {
          console.error('Save failed', err);
          alert('❌ Failed to save. Try again later.');
        }
      });
    }
  }

  updateAttendance(att: Attendance): void {
    this.currentAttendance = { ...att };
    this.isEditing = true;
  }

  deleteAttendance(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.attendanceService.deleteAttendance(id).subscribe({
        next: () => {
          alert('🗑️ Deleted successfully');
          this.loadAttendance();
        },
        error: (err) => {
          console.error('Failed to delete', err);
          alert('❌ Try again later.');
        }
      });
    }
  }

  resetForm(): void {
    this.currentAttendance = {
      attendanceId: 0,
      employeeId: 0,
      status: '',
      checkInTime: new Date(),
      checkOutTime: new Date(),
      remarks: '',
      date: new Date()
    };
    this.isEditing = false;
  }
}
