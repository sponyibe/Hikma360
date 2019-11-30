import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tenets', loadChildren: './tenets/tenets.module#TenetsPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'halal-certification', loadChildren: './halal-certification/halal-certification.module#HalalCertificationPageModule' },
  { path: 'halal-organization', loadChildren: './halal-organization/halal-organization.module#HalalOrganizationPageModule' },
  { path: 'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsPageModule' },
  { path: 'restaurant-details', loadChildren: './restaurant-details/restaurant-details.module#RestaurantDetailsPageModule' },
  { path: 'restaurant-details/:id', loadChildren: './restaurant-details/restaurant-details.module#RestaurantDetailsPageModule' },
  { path: 'grocery-stores', loadChildren: './grocery-stores/grocery-stores.module#GroceryStoresPageModule' },
  { path: 'grocery-store-details/:id', loadChildren: './grocery-store-details/grocery-store-details.module#GroceryStoreDetailsPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'organizations-details', loadChildren: './organizations-details/organizations-details.module#OrganizationsDetailsPageModule' },
  { path: 'certification-details', loadChildren: './certification-details/certification-details.module#CertificationDetailsPageModule' },
  { path: 'organizations-details/:id', loadChildren: './organizations-details/organizations-details.module#OrganizationsDetailsPageModule' },
  { path: 'certification-details/:id', loadChildren: './certification-details/certification-details.module#CertificationDetailsPageModule' },
  { path: 'menu/search-halal', loadChildren: './search-halal/search-halal.module#SearchHalalPageModule' },
  { path: 'menu/image-search', loadChildren: './image-search/image-search.module#ImageSearchPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })
    //enableTracing: true, 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

