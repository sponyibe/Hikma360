import { Component, OnInit } from '@angular/core';
import { Certifyingbodies, CertifyingBodiesService } from '../services/certifyingbodies.service';


@Component({
  selector: 'app-halal-certification',
  templateUrl: './halal-certification.page.html',
  styleUrls: ['./halal-certification.page.scss'],
})
export class HalalCertificationPage implements OnInit {

  public certifyingbodies: Certifyingbodies[];
  public loadedCertifyingBodiesList: Certifyingbodies[];

  constructor(private certifyingbodiesService : CertifyingBodiesService ) { }

  ngOnInit() {
    this.certifyingbodiesService.getCertifyingBodies()
      .subscribe(certifyingbodies =>{
        this.certifyingbodies = certifyingbodies;
        this.loadedCertifyingBodiesList = certifyingbodies;
      });


  }

  initializeItems(): void{
    this.certifyingbodies = this.loadedCertifyingBodiesList
  }

}