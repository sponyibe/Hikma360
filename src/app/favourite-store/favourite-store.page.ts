import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouritesService, Favourites, Store } from '../services/favourites.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    Store: [],
    userId: '',
  }

  

  constructor(private activatedRoute: ActivatedRoute, private favouritesService: FavouritesService,
    private toastCtrl: ToastController, private router:Router, private afs: AngularFirestore) { }

  ngOnInit() {
    // let id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id){
    //   this.favouritesService.getFavouritesDetails(id).subscribe(store => {
    //     this.favourites = store;
    //     console.log(this.favourites);
    //     // this.favouritesService.addFavouriteSortedStore(this.favourites);
    //     if (this.favourites.Store.length >= 3) {
    //       this.calculateOurPriceRating(this.favourites)
    //     }
    //     });
    // }
  }

  ionViewWillEnter(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.favouritesService.getFavouritesDetails(id).subscribe(store => {
        this.favourites = store;
        console.log(this.favourites);
        // this.favouritesService.addFavouriteSortedStore(this.favourites);
        
        });
    }
  }

  // StoreDetails(){
  //   let id = this.activatedRoute.snapshot.paramMap.get('id');
  //   console.log(id)
  //     this.favouritesService.getStoreDetails('o9OP2A5qfBqXMG01NLmX').subscribe(store => {
  //       this.favourites.Store[1] = store;
  //       console.log(this.favourites.Store[1]);
  //     });
  // }

  
}
