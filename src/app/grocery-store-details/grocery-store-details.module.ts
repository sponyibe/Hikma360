import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { GroceryStoreDetailsPage } from './grocery-store-details.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryStoreDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroceryStoreDetailsPage]
})
export class GroceryStoreDetailsPageModule {}
