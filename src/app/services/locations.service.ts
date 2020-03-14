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
    // this.restaurants.subscribe(list =>{ this.restaurantData = this.applyHaversine(list, usersLocation)} )
    return this.restaurants
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

 /*  applyHaversine(locations: Restaurant[], usersLocation) {

    console.log(usersLocation)
    // console.log(locations)

    locations.map((location) => {


      let placeLocation = {
        lat: location.Latitude,
        lng: location.Longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
      ).toFixed(2);
    });
    // console.log(locations);
    return locations;
  }

  getDistanceBetweenPoints(start, end) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius.km;
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  } */
}
