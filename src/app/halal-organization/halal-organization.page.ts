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

  public searchOrgTerm;
  public filtered: Certifyingorganization[];


  constructor(private certifyingorganizationService : CertifyingOrganizationService, private loadingCtrl: LoadingController ) { }

  // ngOnInit() {
  // }

  async ionViewWillEnter() { 

    this.subscription = this.certifyingorganizationService.getCertifyingOrganization()
    .subscribe(certifyingorganization =>{
      this.certifyingorganizations = certifyingorganization;
      // console.log(this.certifyingorganizations)
      // this.loadedCertifyingOrganizationList = certifyingorganization;
      this.filtered = this.certifyingorganizations.slice(0)
    });
  }

  // initializeItems(): void{
  //   this.certifyingorganization = this.loadedCertifyingOrganizationList
  // }

  // searchOrgList(){
  //   this.certifyingorganizations = this.filtered;

  //   console.log(this.filtered)

  //   console.log(this.certifyingorganizations)

  //   let sample = this.filtered.filter(
  //     (thing, i, arr) => arr.findIndex(t => t.OrganisationsCertified === thing.OrganisationsCertified) === i);

  //   sample = this.filtered.filter( type =>{
  //     console.log(type.OrganisationsCertified)
  //     type.OrganisationsCertified.toLowerCase() == this.searchOrgTerm.toLowerCase()
  //   })
  //   console.log(sample);

  // }

  ionViewWillLeave(){
    console.log("Leave init")
    // this.subscription.unsubscribe()
  }
}
