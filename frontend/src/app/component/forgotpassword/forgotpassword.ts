import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.scss']
})
export class ForgotPasswordComponent {

  form;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const username =  this.form.get('username')!.value as string;

    this.auth.forgotPassword(username).
    subscribe({
      next: () => {
        this.loading = false;
        this.successMessage =
          'Password reset instructions have been sent.';
        this.form.reset();
      },
      error: err => {
        this.loading = false;
        this.errorMessage =
          err.error || 'Something went wrong. Try again.';
      }
    });
  }
}
