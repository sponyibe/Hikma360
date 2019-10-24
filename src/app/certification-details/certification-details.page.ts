import { Component, OnInit } from '@angular/core';
import { Certifyingbodies, CertifyingBodiesService } from '../services/certifyingbodies.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'



@Component({
  selector: 'app-certification-details',
  templateUrl: './certification-details.page.html',
  styleUrls: ['./certification-details.page.scss'],
})
export class CertificationDetailsPage implements OnInit {

  certifyingbodies: Certifyingbodies={
    Column1: 0,
  Organisation: "",
  Address: "",
  Telephone: "",
  Website: "",
  Email: "",
  Slaughter:"",
  StatedConditions: "",
  Others: "",

  };

  constructor(private route: ActivatedRoute, private nav:NavController, private certifyingbodiesService : CertifyingBodiesService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.ionViewWillEnter()
  }


  ionViewWillEnter(){
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.certifyingbodiesService.getCertifyingBody(id).subscribe(certifyingbodies => {
        this.certifyingbodies = certifyingbodies;
      });
    }
  }
}
