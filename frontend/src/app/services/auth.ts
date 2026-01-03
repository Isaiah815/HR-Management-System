import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5087/api/user'; 

  constructor(private http: HttpClient) {}

  login(model: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, model);
  }

  register(model: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, model);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }

  forgotPassword(username: string) {
  return this.http.post(`${this.apiUrl}/forgot-password`, { username });
}

resetPassword(token: string, newPassword: string) {
  return this.http.post(`${this.apiUrl}/reset-password`, {
    token,
    newPassword
  });
}

}
