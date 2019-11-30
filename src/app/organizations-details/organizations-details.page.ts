import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'
import { Observable } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-organizations-details',
  templateUrl: './organizations-details.page.html',
  styleUrls: ['./organizations-details.page.scss'],
})
export class OrganizationsDetailsPage implements OnInit {

  //public organizations :Observable<Certifyingorganization[]>;

  certifyingorganization: Certifyingorganization={
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
  //certifyingorganizationId = null;
  

  constructor(private route: ActivatedRoute, private nav:NavController, private certifyingorganizationService : CertifyingOrganizationService, private loadingController: LoadingController, private inAppBrowser: InAppBrowser ) { }


  ngOnInit() {
      this.ionViewWillEnter();
  }

 ionViewWillEnter(){
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.certifyingorganizationService.getCertifyingOrganizations(id).subscribe(certifyingorganization => {
        this.certifyingorganization = certifyingorganization;
      });
    }
  
}

openWebsite(){
  this.inAppBrowser.create(this.certifyingorganization.Website, '_system');
}
}
