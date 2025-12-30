import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  constructor(private _messageService: MessageService) {}

  Toast(severity: string, summary: string, detail: string, life: number) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  }
}
