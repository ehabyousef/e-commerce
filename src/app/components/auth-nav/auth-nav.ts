import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-auth-nav',
  imports: [
    Menubar,
    BadgeModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    RouterLink
],
  templateUrl: './auth-nav.html',
  styleUrl: './auth-nav.scss',
})
export class AuthNav {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'login',
        icon: 'pi pi-sign-in',
        path: 'login',
      },
      {
        label: 'register',
        icon: 'pi pi-user-plus',
        path: 'register',
      },
    ];
  }
}
