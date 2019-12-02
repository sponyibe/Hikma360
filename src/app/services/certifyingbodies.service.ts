import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

export interface Certifyingbodies {
  id?: string;
  Column1: number;
  Organisation: string;
  Address: string;
  Telephone: string;
  Website: string;
  Email: string;
  Slaughter: string;
  StatedConditions: string;
  Others: string;

}

@Injectable({
    providedIn: 'root'
  })
  export class CertifyingBodiesService {
  
    private certifyingbodiesCollection: AngularFirestoreCollection<Certifyingbodies>;
  
    private certifyingbodies: Observable<Certifyingbodies[]>
    
    constructor(db: AngularFirestore) {
      this.certifyingbodiesCollection = db.collection<Certifyingbodies>('certifyingbodies');
  
      this.certifyingbodies =  this.certifyingbodiesCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map (a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
     }
  
     getCertifyingBodies(){
       return this.certifyingbodies;
     }
  
     getCertifyingBody(id){
       return this.certifyingbodiesCollection.doc<Certifyingbodies>(id).valueChanges();
     }
  }