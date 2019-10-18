import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Ingredient {
  nonhalal: string;
  notes: string;
}

@Injectable({
  providedIn: "root"
})
export class IngredientService {
  private ingredientsCollection: AngularFirestoreCollection<Ingredient>;

  private ingredients: Observable<Ingredient[]>;

  constructor(db: AngularFirestore) {
    this.ingredientsCollection = db.collection<Ingredient>("Ingredients");

    this.ingredients = this.ingredientsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(id) {
    return this.ingredientsCollection.doc<Ingredient>(id).valueChanges();
  }
}
