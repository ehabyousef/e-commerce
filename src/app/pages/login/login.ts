import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ILogin } from '../../core/interface/iregister';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/module/shared-module';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  isSubmitting = signal(false);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  shouldShowError(controlName: 'email' | 'password'): boolean {
    const control = this.loginForm.controls[controlName];
    return !!(control.invalid && control.touched);
  }

  getErrorMessage(controlName: 'email' | 'password'): string {
    const control = this.loginForm.controls[controlName];
    if (control.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    if (control.hasError('maxlength')) {
      const max = control.getError('maxlength').requiredLength;
      return `maximum ${max} character required`;
    }
    return '';
  }

  // Type-safe access to form values
  Submit() {
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      try {
        const formData = this.loginForm.getRawValue(); // Fully typed!
        this.Login(formData);
      } catch (error) {
        this.show('error', 'error', 'sign up failed');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  Login(data: ILogin) {
    this.authService.login(data).subscribe({
      next: (res) => {
        if (res.token) {
          this.show('success', 'success', 'sign in successed');
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigate(['user']);
          }, 1000);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        const errorMessage = err.error?.message || 'Invalid email or password';
        this.show('error', 'Login Failed', errorMessage);
      },
    });
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 2000,
    });
  }
}
