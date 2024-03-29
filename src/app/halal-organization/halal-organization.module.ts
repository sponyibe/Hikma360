import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HalalOrganizationPage } from './halal-organization.page';

const routes: Routes = [
  {
    path: '',
    component: HalalOrganizationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HalalOrganizationPage]
})
export class HalalOrganizationPageModule {}
