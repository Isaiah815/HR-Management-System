import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../services/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone : true,
  imports:[ReactiveFormsModule,CommonModule]
})
export class RegisterComponent {

  errorMessage = '';
  successMessage = '';
  form : any;
  
constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })};submit() {
  if (this.form.invalid) {
    this.errorMessage = 'Please fill all the fields';
    return;
  }

  this.errorMessage = '';
  this.successMessage = '';

  this.auth.register(this.form.value).subscribe({
    next: (res: any) => {
      this.successMessage = res.message ?? 'Registration successful';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: err => {
      if (typeof err.error === 'string') {
        this.errorMessage = err.error;
      } else if (err.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Registration failed';
      }
    }
  });
}


}


