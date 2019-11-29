import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'image-search', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tenets', loadChildren: './tenets/tenets.module#TenetsPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'menu/search-halal', loadChildren: './pages/search-halal/search-halal.module#SearchHalalPageModule' },
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

