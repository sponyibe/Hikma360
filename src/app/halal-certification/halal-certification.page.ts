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
export class HalalCertificationPage {

  public certifyingbodies: Certifyingbodies[];
  public loadedCertifyingBodiesList: Certifyingbodies[];
  private subscription: Subscription;

  constructor(private certifyingbodiesService : CertifyingBodiesService, private loadingCtrl: LoadingController) { }

  // ngOnInit() {
    
  // }

  async ionViewDidEnter() { 
    const loading = await this.loadingCtrl.create({
      message: 'loading stores..',
      spinner: "circles",
      translucent: true,
      backdropDismiss: true
    })
    await loading.present();
    this.subscription = this.certifyingbodiesService.getCertifyingBodies()
    .subscribe(certifyingbodies =>{
      loading.dismiss();
      this.certifyingbodies = certifyingbodies;
      // this.loadedCertifyingBodiesList = certifyingbodies;
    });
  }

  initializeItems(): void{
    this.certifyingbodies = this.loadedCertifyingBodiesList
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }

}