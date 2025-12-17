import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-footer',
  imports: [],
  templateUrl: './auth-footer.html',
  styleUrl: './auth-footer.scss',
})
export class AuthFooter {
  currentYear = new Date().getFullYear();
}
