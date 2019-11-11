import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CertificationDetailsPage } from './certification-details.page';

const routes: Routes = [
  {
    path: '',
    component: CertificationDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificationDetailsPage]
})
export class CertificationDetailsPageModule {}
