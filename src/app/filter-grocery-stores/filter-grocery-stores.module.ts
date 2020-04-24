import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterGroceryStoresPage } from './filter-grocery-stores.page';

const routes: Routes = [
  {
    path: '',
    component: FilterGroceryStoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FilterGroceryStoresPage]
})
export class FilterGroceryStoresPageModule {}
