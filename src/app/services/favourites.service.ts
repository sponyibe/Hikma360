import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Timestamp, FieldValue } from '@firebase/firestore-types';

export interface Store {
  Name: string,
  datePurchased: Timestamp,
  pricePerUnit: number,
  priceRating: number,
  quality: number,
  customerService: number,
  ratedTotal?: number
}

export interface Favourites {
  id?: string,
  itemPurchased: string,
  stores: Store[]
}

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

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

  addFavouriteStore(store: Favourites): Promise<DocumentReference> {
    return this.favouritesCollection.add(store)
  }

  deleteFavouriteStore(id: string): Promise<void> {
    return this.favouritesCollection.doc(id).delete();
  }


}
