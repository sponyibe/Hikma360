import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

//import { TabsPageRoutingModule } from './tabs.router.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
        children:[
          {
            path: 'halal-certification',
            loadChildren: '../halal-certification/halal-certification.module#HalalCertificationPageModule' 
          },
          {
            path: 'halal-organization',
            loadChildren: '../halal-organization/halal-organization.module#HalalOrganizationPageModule'
          },
          
          {
            path:'organizations-details',
            loadChildren: '../organizations-details/organizations-details.module#OrganizationsDetailsPageModule'
          },

          {
            path:'certification-details',
            loadChildren: '../certification-details/certification-details.module#CertificationDetailsPageModule'
          }
        ]
        
      },
      {
          path: '',
          redirectTo: '/tabs/halal-certification',
          pathMatch: 'full'
        }

    ];

  //{
  //  path: '',
   // redirectTo: '/tabs/halal-certification',
   // pathMatch: 'full'
  //}



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
