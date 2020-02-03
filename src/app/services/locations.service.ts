import { Injectable } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

export interface Restaurant {
  id?: string;
  Name: string;
  Address: string;
  Region: string;
  SubRegions: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  HoursOfOperation: string;
  CertifiedBy: string;
  CuisneType: string;
  PriceRange: string;
  Rating: number;
  Notes: string;
  distance: any;
  Website: string;
}

@Injectable({
  providedIn: "root"
})
export class LocationsService {
  private restaurantsCollection: AngularFirestoreCollection<Restaurant>;

  private restaurants: Observable<Restaurant[]>;
  public restaurantData: Restaurant[];

  constructor(db: AngularFirestore) {
    this.restaurantsCollection = db.collection<Restaurant>("Restaurants");

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

  getRestaurant(id: string) {
    return this.restaurantsCollection
      .doc<Restaurant>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(restaurant => {
          restaurant.id = id;
          return restaurant;
        })
      );
  }
}
