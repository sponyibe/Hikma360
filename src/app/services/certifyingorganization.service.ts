import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

export interface Certifyingorganization {
 id?: string;
 Address: string;
 Brands: string;
 CertifyingBody: string;
 City: string;
 Column1: number;
 OrganisationsCertified: string;
 OutletType: string;
 Products: string;
 Telephone: string;
 Website: string;
 EmailAddress: string;
}

@Injectable({
    providedIn: 'root'
  })
  export class CertifyingOrganizationService {
  
    private certifyingorganizationCollection: AngularFirestoreCollection<Certifyingorganization>;
  
    private certifyingorganization: Observable<Certifyingorganization[]>

    public certifyingOrganizationsData: Certifyingorganization[]
    
    constructor(db: AngularFirestore) {
      this.certifyingorganizationCollection = db.collection<Certifyingorganization>('certifyingorganizations',ref=>ref.orderBy('OrganisationsCertified'));
  
      this.certifyingorganization =  this.certifyingorganizationCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map (a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
     }
  
     getCertifyingOrganization(){
       return this.certifyingorganization;
     }
  
     getCertifyingOrganizations(id){
       return this.certifyingorganizationCollection.doc<Certifyingorganization>(id).valueChanges();
     }
  }