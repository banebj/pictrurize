import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './images.component';
import { ImagesService } from '../../services/images.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from '../../shared/http-interceptor';

@NgModule({
  imports: [
    CommonModule,
    ImagesRoutingModule
  ],
  providers: [
    ImagesService,
  ],
  declarations: [ImagesComponent]
})
export class ImagesModule { }