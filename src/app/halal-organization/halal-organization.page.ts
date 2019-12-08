import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-halal-organization',
  templateUrl: './halal-organization.page.html',
  styleUrls: ['./halal-organization.page.scss'],
})
export class HalalOrganizationPage{
  public certifyingorganizations: Certifyingorganization[];
  // public loadedCertifyingOrganizationList: Certifyingorganization[];
  private subscription: Subscription;


  constructor(private certifyingorganizationService : CertifyingOrganizationService, private loadingCtrl: LoadingController ) { }

  // ngOnInit() {
  // }

  async ionViewWillEnter() { 

    this.subscription = this.certifyingorganizationService.getCertifyingOrganization()
    .subscribe(certifyingorganization =>{
      this.certifyingorganizations = certifyingorganization;
      console.log(this.certifyingorganizations)
      // this.loadedCertifyingOrganizationList = certifyingorganization;
    });
  }

  // initializeItems(): void{
  //   this.certifyingorganization = this.loadedCertifyingOrganizationList
  // }

  ionViewWillLeave(){
    console.log("Leave init")
    // this.subscription.unsubscribe()
  }
}
