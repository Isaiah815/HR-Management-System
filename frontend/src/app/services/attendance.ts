import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Attendance{
  attendanceId:number;
  employeeId: number;
  status:string;
  checkInTime: Date;
  checkOutTime:Date;
  remarks:string;
  date:Date;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:5087/api/attendance';

  constructor(private http :HttpClient){}

  getAllAttendance(): Observable<Attendance[]>{
  return this.http.get<Attendance[]>(this.apiUrl);
  }

  getDepartmentById(id: number) : Observable<Attendance>{
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`);
  }

  createAttendance(att:Attendance): Observable<Attendance>{
    return this.http.post<Attendance>( this.apiUrl,att);
  }
  updateAttendance(id:number, att:Attendance):Observable<Attendance>{
    return this.http.put<Attendance>(`${this.apiUrl}/${id}`,att);
  }
  deleteAttendance(id: number):Observable<Attendance>{
    return this.http.delete<Attendance>(`${this.apiUrl}/${id}`);
  }

  

}
