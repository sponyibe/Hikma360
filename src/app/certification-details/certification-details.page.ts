import { Component } from '@angular/core';
import { Certifyingbodies, CertifyingBodiesService } from '../services/certifyingbodies.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-certification-details',
  templateUrl: './certification-details.page.html',
  styleUrls: ['./certification-details.page.scss'],
})
export class CertificationDetailsPage {

  certifyingbodies: Certifyingbodies = {
    Column1: 0,
    Organisation: "",
    Address: "",
    Telephone: "",
    Website: "",
    Email: "",
    Slaughter: "",
    StatedConditions: "",
    Others: "",

  };

  private subscription: Subscription

  constructor(private route: ActivatedRoute,
    private certifyingbodiesService: CertifyingBodiesService,
    private inAppBrowser: InAppBrowser) {

  }

  ionViewWillEnter() {
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.subscription = this.certifyingbodiesService.getCertifyingBody(id).subscribe(certifyingbodies => {
        this.certifyingbodies = certifyingbodies;
      });
    }
  }

  openWebsite() {
    this.inAppBrowser.create(this.certifyingbodies.Website, '_system');
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe()
  }
}
