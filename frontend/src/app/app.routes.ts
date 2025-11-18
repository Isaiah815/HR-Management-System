import { Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department';
import { EmployeeComponent } from './component/employee/employee';
import { LeaveRequestComponent } from './component/leave-request/leave-request';
import { AttendanceComponent } from './component/attendance/attendance';
import { PayrollComponent } from './component/payroll/payroll';
import { LoginComponent } from './component/login/login';
import { DashboardComponent } from './component/dashboard/dashboard';

export const routes: Routes = [
  // 🟢 Default route → goes to login page
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // 🟢 Login route
  { path: 'login', component: LoginComponent },

  // 🟢 Protected routes (main system)
  { path: 'departments', component: DepartmentComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leaveRequest', component: LeaveRequestComponent },
  { path: 'payroll', component: PayrollComponent },

  // 🟥 Wildcard route (optional, handles unknown URLs)
  { path: '**', redirectTo: '/login' }
];
