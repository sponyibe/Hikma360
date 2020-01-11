import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchHalalPage } from './search-halal.page';
import { ImageCropperModule } from 'ngx-image-cropper'

const routes: Routes = [
  {
    path: '',
    component: SearchHalalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ImageCropperModule
  ],
  declarations: [SearchHalalPage]
})
export class SearchHalalPageModule {}
