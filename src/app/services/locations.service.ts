import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from "rxjs/operators";

export interface Restauarant {
  id?: string;
  Name: string;
  Address: string;
  Region: string;
  subRegion: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  Hours: string;
  CertifiedBy: string;
  CuisineType: string;
  PriceRange: string;
  Rating: number;
  Notes: string;
  distance: any;
  Website: string;
};

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private restaurantsCollection: AngularFirestoreCollection<Restauarant>;

  private restaurants: Observable<Restauarant[]>

  constructor(db: AngularFirestore) {
    this.restaurantsCollection = db.collection<Restauarant>('Restaurants');

    this.restaurants = this.restaurantsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getLocations() {
    return this.restaurants;
  }

  getIngredient(id: string) {
    return this.restaurantsCollection.doc<Restauarant>(id).valueChanges().pipe(
      take(1),
      map(restaurant => {
        restaurant.id = id;
        return restaurant
      })
    );
  }
}
