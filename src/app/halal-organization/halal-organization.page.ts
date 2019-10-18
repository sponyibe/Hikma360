import { Component, OnInit } from '@angular/core';
import { Certifyingorganization, CertifyingOrganizationService } from '../services/certifyingorganization.service';


@Component({
  selector: 'app-halal-organization',
  templateUrl: './halal-organization.page.html',
  styleUrls: ['./halal-organization.page.scss'],
})
export class HalalOrganizationPage implements OnInit {
  public certifyingorganization: Certifyingorganization[];
  public loadedCertifyingOrganizationList: Certifyingorganization[];


  constructor(private certifyingorganizationService : CertifyingOrganizationService ) { }

  ngOnInit() {
    this.certifyingorganizationService.getCertifyingOrganization()
      .subscribe(certifyingorganization =>{
        this.certifyingorganization = certifyingorganization;
        this.loadedCertifyingOrganizationList = certifyingorganization;
      });
  }

  initializeItems(): void{
    this.certifyingorganization = this.loadedCertifyingOrganizationList
  }

}
