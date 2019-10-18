import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
 {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
<<<<<<< HEAD

      {
        path:'search-halal',
        loadChildren:  './pages/search-halal/search-halal.module#SearchHalalPageModule'
=======
      {
        path: 'search-halal',
        loadChildren: '../search-halal/search-halal.module#SearchHalalPageModule'
>>>>>>> addd95424677764034c7f68d7849176719a21555
      }
     
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
