import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tenets', loadChildren: './tenets/tenets.module#TenetsPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'search-halal', loadChildren: './search-halal/search-halal.module#SearchHalalPageModule' },
  { path: 'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsPageModule' },
  { path: 'restaurant-details', loadChildren: './restaurant-details/restaurant-details.module#RestaurantDetailsPageModule' },
  { path: 'restaurant-details/:id', loadChildren: './restaurant-details/restaurant-details.module#RestaurantDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })
    //enableTracing: true, 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

