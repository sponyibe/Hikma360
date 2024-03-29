import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
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
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private storeReturned: Store
  private newStore : Favourites

  private favouritesCollection: AngularFirestoreCollection<Favourites>;

  private favourites: Observable<Favourites[]>

  constructor(private afAuth: AngularFireAuth ,private afs: AngularFirestore ) {

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

   getFavourites(): Observable<Favourites[]> {
    return this.favourites;
  }

  getFavouritesDetails(id: string) {
    return this.favouritesCollection.doc<Favourites>(id).valueChanges().pipe(
      take(1),
      map(item => {
        item.id = id;
        return item
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

  deleteFavouriteItem(id: string): Promise<void> {
    return this.favouritesCollection.doc(id).delete();
  }

  updateFavouriteItem(id:string,item: string): Promise<void> {
    console.log(id, item)
    return this.favouritesCollection.doc(id).update({itemPurchased: item})
  }

  deleteFavouriteSortedStore(store: Favourites, index: number): Promise<void> {
    return this.afs.collection('Favourites').doc(store.id).update({ Store: firebase.firestore.FieldValue.arrayRemove(store.Store[index])})
  }

  addStore(store:Favourites): Promise<void> {
    let addedStore = store.Store.length-1
      return this.afs.collection('Favourites').doc(store.id).update({ Store: firebase.firestore.FieldValue.arrayUnion(store.Store[addedStore])})
  }

  addSortedStore(store:Favourites, index: number): Promise<void> {
    //let addedStore = store.Store.length-1
      return this.afs.collection('Favourites').doc(store.id).update({ Store: firebase.firestore.FieldValue.arrayUnion(store.Store[index])})
  }

  clearStore(store:Favourites, userId): Promise<void> {
    console.log(store)
      return this.afs.collection('Favourites').doc(store.id).set({ Store: [], itemPurchased: store.itemPurchased, userId: userId });
  }
}
