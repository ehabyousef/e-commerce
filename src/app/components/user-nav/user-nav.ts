import { Component, signal } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { Router, RouterLink } from '@angular/router';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';
import { AuthService } from '../../core/services/auth-service';
@Component({
  selector: 'app-user-nav',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    RouterLink,
    Popover,
    Button,
  ],
  templateUrl: './user-nav.html',
  styleUrl: './user-nav.scss',
})
export class UserNav {
  constructor(private authService: AuthService, private router: Router) {}
  items: MenuItem[] | undefined;
  logged = signal(false);
  ngOnInit() {
    this.items = [
      {
        label: 'Home',

        routerLink: 'home',
      },
      {
        label: 'Products',

        badge: '3',
        items: [
          {
            label: 'All',
            icon: 'pi pi-bolt',
            shortcut: PrimeIcons.BOLT,
            routerLink: 'products',
          },
          {
            label: 'Men',
            icon: 'pi pi-server',
            shortcut: PrimeIcons.MARS,
            routerLink: 'products',
          },
          {
            label: 'Women',
            icon: 'pi pi-pencil',
            shortcut: PrimeIcons.VENUS,
            routerLink: 'products',
          },
        ],
      },
    ];
    this.logged.set(this.authService.isAuthenticated);
    console.log(this.logged());
  }
  logout = () => {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  };
}
