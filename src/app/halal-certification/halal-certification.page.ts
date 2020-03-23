import { Component, OnInit } from '@angular/core';
import { Certifyingbodies, CertifyingBodiesService } from '../services/certifyingbodies.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { load } from '@angular/core/src/render3';


@Component({
  selector: 'app-halal-certification',
  templateUrl: './halal-certification.page.html',
  styleUrls: ['./halal-certification.page.scss'],
})
export class HalalCertificationPage{

  public certifyingbodies: Certifyingbodies[];
  public loadedCertifyingBodiesList: Certifyingbodies[];
  private subscription: Subscription;

  constructor(private certifyingbodiesService : CertifyingBodiesService, private loadingCtrl: LoadingController) { }

  async ionViewWillEnter() { 

    if(this.certifyingbodiesService.certifyingBodiesData){
      this.certifyingbodies = [...this.certifyingbodiesService.certifyingBodiesData]
    }


    this.subscription = this.certifyingbodiesService.getCertifyingBodies()
    .subscribe(certifyingbodies =>{
      console.log('In certifying bodies')

      this.certifyingbodies = certifyingbodies;

      this.certifyingbodiesService.certifyingBodiesData = [...this.certifyingbodies]
      // console.log(this.certifyingbodies)
      // this.loadedCertifyingBodiesList = certifyingbodies;
    });
  }

  // initializeItems(): void{
  //   this.certifyingbodies = this.loadedCertifyingBodiesList
  // }

  ionViewWillLeave(){
    if(this.subscription){
      console.log("Leave init")
      this.subscription.unsubscribe()
    }
  }

}