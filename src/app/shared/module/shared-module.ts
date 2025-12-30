import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    Message,
    RouterLink,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    Message,
    RouterLink,

  ],

})
export class SharedModule {}
