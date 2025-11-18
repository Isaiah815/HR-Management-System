import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  pendingLeaveRequests: number;
  approvedLeaveRequests: number,
  rejectedLeaveRequests: number,
  payrollProcessed: number;
  attendanceRecords: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5087/api/dashboard/summary';

  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
  }
}
