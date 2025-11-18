import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department{
  departmentId: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:5087/api/department';

  constructor (private http:HttpClient){}

  getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartmentById(id : number):Observable<Department>{
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  createDepartment(dept: Department):Observable<Department>{
    return this.http.post<Department>(this.apiUrl,dept);
  }
  updateDepartment(id: number,dept:Department):Observable<Department>{
    return this.http.put<Department>(`${this.apiUrl}/${id}`,dept);
  }

  deleteDepartment(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }



  
}
