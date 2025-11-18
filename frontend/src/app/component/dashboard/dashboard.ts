import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService,DashboardStats } from '../../services/dashboard';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats= {
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaveRequests: 0,
    approvedLeaveRequests:0,
    rejectedLeaveRequests: 0,
    payrollProcessed: 0,
    attendanceRecords: 0
  };

  loading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardSummary().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
