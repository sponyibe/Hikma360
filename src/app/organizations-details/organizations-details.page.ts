import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-organizations-details',
  templateUrl: './organizations-details.page.html',
  styleUrls: ['./organizations-details.page.scss'],
})
export class OrganizationsDetailsPage {

  certifyingorganization: Certifyingorganization = {
    Address: "",
    Brands: "",
    CertifyingBody: "",
    City: "",
    Column1: 0,
    OrganisationsCertified: "",
    OutletType: "",
    Products: "",
    Telephone: "",
    Website: "",
    EmailAddress: ""
  };

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private certifyingorganizationService: CertifyingOrganizationService,
    private inAppBrowser: InAppBrowser) { }


  ionViewWillEnter() {
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.subscription = this.certifyingorganizationService.getCertifyingOrganizations(id).subscribe(certifyingorganization => {
        this.certifyingorganization = certifyingorganization;
      });
    }
  }

  openWebsite() {
    this.inAppBrowser.create(this.certifyingorganization.Website, '_system');
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
