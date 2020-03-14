import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
//import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-halal-organization',
  templateUrl: './halal-organization.page.html',
  styleUrls: ['./halal-organization.page.scss'],
})
export class HalalOrganizationPage{
  public certifyingorganizations: Certifyingorganization[];
  public loadedCertifyingOrganizationList: Certifyingorganization[];
  private subscription: Subscription;

  public searchOrgTerm;
  public filtered: Certifyingorganization[];


  constructor(private certifyingorganizationService : CertifyingOrganizationService, private loadingCtrl: LoadingController ) { }

  // ngOnInit() {
  // }

  ngOnInit() { 

  }

  async ionViewDidEnter(){

    this.certifyingorganizationService.getCertifyingOrganization()
    .subscribe(certifyingorganization =>{
      this.certifyingorganizations = certifyingorganization;
      // console.log(this.certifyingorganizations)
      this.loadedCertifyingOrganizationList = certifyingorganization;
    });
  }

  initializeItems(): void{
     this.certifyingorganizations = this.loadedCertifyingOrganizationList;
   }

   filterList(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }
  
    this.certifyingorganizations = this.certifyingorganizations.filter(org => {
      if (org.OrganisationsCertified && searchTerm) {
      if(org.OrganisationsCertified.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        {
          return true;
        }
        return false;
      }
    });
  }

  

  ionViewWillLeave(){
    console.log("Leave init")
    // this.subscription.unsubscribe()
  }
}

