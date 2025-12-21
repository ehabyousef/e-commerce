import { Component } from '@angular/core';
import { UserNav } from '../../components/user-nav/user-nav';
import { UserFooter } from '../../components/user-footer/user-footer';
import { RouterOutlet } from '@angular/router';
import { AuthFooter } from '../../components/auth-footer/auth-footer';

@Component({
  selector: 'app-user-layout',
  imports: [UserNav, RouterOutlet, AuthFooter],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {}
