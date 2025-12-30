import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('guest');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.userName.next(localStorage.getItem('userName') || 'guest');
    }
  }
}
