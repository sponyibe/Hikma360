import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';

import { RestaurantDetailsPage } from './restaurant-details.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDetailsPage
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
  declarations: [RestaurantDetailsPage]
})
export class RestaurantDetailsPageModule {}
