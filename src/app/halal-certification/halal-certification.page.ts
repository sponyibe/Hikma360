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
export class HalalCertificationPage implements OnInit{

  public certifyingbodies: Certifyingbodies[];
  // public loadedCertifyingBodiesList: Certifyingbodies[];
  private subscription: Subscription;

  constructor(private certifyingbodiesService : CertifyingBodiesService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
  }

  async ionViewDidEnter() { 
    console.log("certyfting codies")
 
    this.subscription = this.certifyingbodiesService.getCertifyingBodies()
    .subscribe(certifyingbodies =>{

      this.certifyingbodies = certifyingbodies;
      // console.log(this.certifyingbodies)
      // this.loadedCertifyingBodiesList = certifyingbodies;
    });
  }

  // initializeItems(): void{
  //   this.certifyingbodies = this.loadedCertifyingBodiesList
  // }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }

}