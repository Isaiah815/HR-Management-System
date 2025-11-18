import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  // ✅ define loginData
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // ✅ your backend API call
    this.http.post('http://localhost:5087/api/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          alert('Login successful!');
          this.router.navigate(['/departments']);
        },
        error: (err) => {
          alert('Invalid username or password');
          console.error(err);
        }
      });
  }
}
