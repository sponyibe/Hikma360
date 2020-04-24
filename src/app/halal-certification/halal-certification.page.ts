import { Component } from '@angular/core';
import { Certifyingbodies, CertifyingBodiesService } from '../services/certifyingbodies.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-halal-certification',
  templateUrl: './halal-certification.page.html',
  styleUrls: ['./halal-certification.page.scss'],
})
export class HalalCertificationPage {

  public certifyingbodies: Certifyingbodies[];
  public loadedCertifyingBodiesList: Certifyingbodies[];
  private subscription: Subscription;

  constructor(private certifyingbodiesService : CertifyingBodiesService ) { }

  ionViewDidEnter() { 
    this.subscription = this.certifyingbodiesService.getCertifyingBodies()
    .subscribe(certifyingbodies =>{
      this.certifyingbodies = certifyingbodies;
      this.loadedCertifyingBodiesList = certifyingbodies;
    });
  }

  initializeItems(): void{
    this.certifyingbodies = this.loadedCertifyingBodiesList
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe()
  }

}