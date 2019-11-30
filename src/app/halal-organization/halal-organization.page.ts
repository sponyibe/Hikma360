import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-halal-organization',
  templateUrl: './halal-organization.page.html',
  styleUrls: ['./halal-organization.page.scss'],
})
export class HalalOrganizationPage{
  public certifyingorganization: Certifyingorganization[];
  public loadedCertifyingOrganizationList: Certifyingorganization[];
  private subscription: Subscription;


  constructor(private certifyingorganizationService : CertifyingOrganizationService ) { }

  // ngOnInit() {
  // }

  ionViewDidEnter() { 
    this.subscription = this.certifyingorganizationService.getCertifyingOrganization()
    .subscribe(certifyingorganization =>{
      this.certifyingorganization = certifyingorganization;
      this.loadedCertifyingOrganizationList = certifyingorganization;
    });
  }

  initializeItems(): void{
    this.certifyingorganization = this.loadedCertifyingOrganizationList
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }
}
