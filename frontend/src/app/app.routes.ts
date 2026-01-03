import { Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department';
import { EmployeeComponent } from './component/employee/employee';
import { LeaveRequestComponent } from './component/leave-request/leave-request';
import { AttendanceComponent } from './component/attendance/attendance';
import { PayrollComponent } from './component/payroll/payroll';
import { DashboardComponent } from './component/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { MainLayoutComponent } from './component/main-layout/main-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

 
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'departments', component: DepartmentComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'leaveRequest', component: LeaveRequestComponent },
      { path: 'payroll', component: PayrollComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];
