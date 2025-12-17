import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from '../../core/interface/iregister';
import { AuthService } from '../../core/services/auth-service';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/module/shared-module';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repassword = control.get('repassword')?.value;

  return password === repassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  // Modern typed reactive form - single declaration
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  isSibmitting = signal(false);
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(22),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get repassword() {
    return this.registerForm.controls.repassword;
  }

  shouldShowError(controlName: 'name' | 'email' | 'password' | 'repassword'): boolean {
    const control = this.registerForm.controls[controlName];
    return !!(control.invalid && control.touched);
  }

  getErrorMessage(controlName: 'name' | 'email' | 'password' | 'repassword'): string {
    const control = this.registerForm.controls[controlName];
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
    if (control.hasError('email')) {
      return `${controlName} is invalid`;
    }
    return '';
  }

  // Type-safe access to form values
  Submit() {
    if (this.registerForm.valid) {
      this.isSibmitting.set(true);
      try {
        const formData = this.registerForm.getRawValue(); // Fully typed!
        this.SignUp(formData);
      } catch (error) {
        this.show('error', 'error', 'sign up failed');
      } finally {
        this.isSibmitting.set(false);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  SignUp(data: IRegister) {
    this.authService.register(data).subscribe({
      next: (res) => {
        this.router.navigate(['/auth/login']);
        if (res.id) {
          this.show('success', 'success', 'sign up successed');
          const { email, password } = data;
          this.authService.login({ email, password }).subscribe((next) => {
            this.router.navigate(['user']);
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.show('error', 'error', 'sign up failed');
      },
    });
  }
  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1500,
    });
  }
}
