import { Injectable } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

export interface GroceryStores {
  id?: string;
  Name: string;
  Address: string;
  Region: string;
  SubRegions: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  HoursofOperation: string;
  CertifedBy: string;
  StoreType: string;
  Rating: number;
  Notes: string;
  distance: any;
  Website: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroceryStoresService {

  private groceryStoresCollection: AngularFirestoreCollection<GroceryStores>;

  private groceryStores: Observable<GroceryStores[]>;

  public groceryStoresData: GroceryStores[];

  constructor(db: AngularFirestore) {
    this.groceryStoresCollection = db.collection<GroceryStores>("GroceryStores");

    this.groceryStores = this.groceryStoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getGroceryStores() {
    return this.groceryStores;
  }

  getGroceryStore(id: string) {
    return this.groceryStoresCollection
      .doc<GroceryStores>(id)
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
