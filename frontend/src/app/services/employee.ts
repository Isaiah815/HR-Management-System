import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Employee{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  jobTitle:string;
  departmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5087/api/employees';

  constructor(private http:HttpClient){}

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeeById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  createEmployee(empl:Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl,empl);
  }
  updateEmployee(id: number, empl: Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.apiUrl}/${id}`, empl);
}

  deleteEmployee(id: number): Observable<void>{
   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
