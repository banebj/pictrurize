import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ImagesService } from '../../services/images.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers:
  [ImagesService],
  declarations: [HomeComponent]
})
export class HomeModule { }
