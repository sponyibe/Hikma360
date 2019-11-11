import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Timestamp, FieldValue } from '@firebase/firestore-types';
import * as firebase from 'firebase/app'

export interface Store {
  Name: string,
  datePurchased: string,
  pricePerUnit: number,
  priceRating: number,
  quality: number,
  customerService: number,
  ratedTotal?: number,
  ourPriceRating?: number
}

export interface Favourites {
  id?: string,
  itemPurchased: string,
  Store: Store[]
}

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private storeReturned: Store
  private newStore : Favourites

  private favouritesCollection: AngularFirestoreCollection<Favourites>;

  private favourites: Observable<Favourites[]>

  constructor(private afs: AngularFirestore ) {
    this.favouritesCollection = afs.collection<Favourites>('Favourites');

    this.favourites = this.favouritesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   getFavourites() {
    return this.favourites;
  }

  getFavouritesDetails(id: string) {
    return this.favouritesCollection.doc<Favourites>(id).valueChanges().pipe(
      take(1),
      map(store => {
        store.id = id;
        return store
      })
    );
  }

  getStoreDetails(id: string,index: number) {
    return this.favouritesCollection.doc<Favourites>(id).valueChanges().pipe(
      take(1),
      map(store => {
        store.id = id;
        return store.Store[index]
      })
    );
  }

  addFavouriteStore(store: Favourites): Promise<void> {
    return this.favouritesCollection.doc(store.id).update(store.Store)
  }

  addFavouriteItem(item: Favourites): Promise<DocumentReference> {
    return this.favouritesCollection.add(item)
  }

  deleteFavouriteStore(id: string): Promise<void> {
    return this.favouritesCollection.doc(id).delete();
  }

  addStore(store:Favourites): Promise<void> {
    let addedStore = store.Store.length-1
      return this.afs.collection('Favourites').doc(store.id).update({ Store: firebase.firestore.FieldValue.arrayUnion(store.Store[3])})
  }
}
