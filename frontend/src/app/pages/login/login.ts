import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone : true,
  styleUrls: ['./login.scss'],
  imports:[ReactiveFormsModule,CommonModule]

})
export class LoginComponent {


  errorMessage = '';
  form : any;
   constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }



  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: res => {
        this.auth.saveUser(res.user);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'wrong password or invalid username';
      }
    });
  }
}
