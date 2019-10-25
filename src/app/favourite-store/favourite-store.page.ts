import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouritesService, Favourites, Store } from '../services/favourites.service';

@Component({
  selector: 'app-favourite-store',
  templateUrl: './favourite-store.page.html',
  styleUrls: ['./favourite-store.page.scss'],
})
export class FavouriteStorePage implements OnInit {

  store: Store =  {
    Name: '',
    datePurchased: '',
    pricePerUnit: 0,
    priceRating: 0,
    quality: 0,
    customerService: 0,
  }

  favourites:  Favourites =  {
    id: '',
    itemPurchased: '',
    stores: []
  }

  constructor(private activatedRoute: ActivatedRoute, private favouritesService: FavouritesService,
    private toastCtrl: ToastController, private router:Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.favouritesService.getFavouritesDetails(id).subscribe(store => {
        this.favourites = store;
        console.log(this.favourites);
        });
    }
  }
}
