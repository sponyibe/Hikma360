import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavouritesService, Favourites, Store } from '../services/favourites.service';

@Component({
  selector: 'app-favourite-store',
  templateUrl: './favourite-store.page.html',
  styleUrls: ['./favourite-store.page.scss'],
})
export class FavouriteStorePage {

  store: Store = {
    Name: '',
    datePurchased: '',
    pricePerUnit: 0,
    priceRating: 0,
    quality: 0,
    customerService: 0,
  }

  favourites: Favourites = {
    id: '',
    itemPurchased: '',
    Store: [],
    userId: '',
  }

  private subscription: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private favouritesService: FavouritesService) {
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.favouritesService.getFavouritesDetails(id).subscribe(store => {
        this.favourites = store;
      });
    }
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe()
  }
}
