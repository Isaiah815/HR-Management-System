import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Payroll{
  payRollId: number;
  employeeId: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payDate:Date;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = 'http://localhost:5087/api/payroll';

  constructor(private http: HttpClient){}

  getAllPayRolls(): Observable<Payroll[]>{
    return this.http.get<Payroll[]>( this.apiUrl)
  }

  getPayRollById(id: number):Observable<Payroll>{
    return this.http.get<Payroll>(`${this.apiUrl}/${id}`)
  }

  postPayRoll(payroll:Payroll): Observable<Payroll>{
    return this.http.post<Payroll>(this.apiUrl,payroll)
  }

  updatePayRoll(id:number, payroll:Payroll):Observable<Payroll>{
    return this.http.put<Payroll>(`${this.apiUrl}/${id}`,payroll)
  }

  deletePayRoll(id: number):Observable<Payroll>{
    return this.http.delete<Payroll>( `${this.apiUrl}/${id}`)
  }


  
}
