import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HalalCertificationPage } from './halal-certification.page';

const routes: Routes = [
  {
    path: '',
    component: HalalCertificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HalalCertificationPage]
})
export class HalalCertificationPageModule {}
