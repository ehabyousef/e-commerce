import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { AuthService } from '../../core/services/auth-service';
import { Toast } from 'primeng/toast';
import { ILogin } from '../../core/interface/iregister';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    Message,
    RouterLink,
    Toast,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService],
})
export class Login {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  isSibmitting = signal(false);
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(22),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  shouldShowError(controlName: 'username' | 'password'): boolean {
    const control = this.loginForm.controls[controlName];
    return !!(control.invalid && control.touched);
  }

  getErrorMessage(controlName: 'username' | 'password'): string {
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
      this.isSibmitting.set(true);
      try {
        const formData = this.loginForm.getRawValue(); // Fully typed!
        this.Login(formData);
        console.log(formData);
      } catch (error) {
        this.show('error', 'error', 'sign up failed');
      } finally {
        this.isSibmitting.set(false);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  Login(data: ILogin) {
    this.authService.login(data).subscribe({
      next: (res) => {
        this.router.navigate(['/user']);
        if (res.id) {
          this.show('success', 'success', 'sign in successed');
        }
      },
      error: (err) => {
        console.log(err);
        this.show('error', 'error', 'sign in failed');
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
