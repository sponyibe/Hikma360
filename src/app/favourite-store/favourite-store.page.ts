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
    Store: []
  }

  private storeReturned: Favourites

  constructor(private activatedRoute: ActivatedRoute, private favouritesService: FavouritesService,
    private toastCtrl: ToastController, private router:Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.favouritesService.getFavouritesDetails(id).subscribe(store => {
        this.favourites = store;
        console.log(this.favourites);
        if (this.favourites.Store.length > 3) {
          this.calculateOurPriceRating(this.favourites)
        }
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

  lowestPrice(arra,highest){
		let x = 0;
    let y = 0;
    let i = 0;
    let temp = 0;
    const tnum = arra.length;
    let flag = false;
    let result = false;
   
			while(x < tnum){
				y = x + 1; 
				
				if(y < tnum){
					for(i = y; i < tnum; i++){
						
						if(arra[x].pricePerUnit > arra[i].pricePerUnit){
							temp = arra[i]
							arra[i] = arra[x];
							arra[x] = temp;
							flag = true; 
						}else{
							continue;
						}	
					}					
				}
				
				if(flag){
					flag = false;
				}else{
					x++; 
					if(x === highest){ 
						result = true;
					}	
				}
				if(result){
					break;
				}
			}

			return (arra[(highest - 1)]);	
		}

  calculateOurPriceRating(store: Favourites){
    for (let index = 1; index < store.Store.length; index++) {
      this.store = this.lowestPrice(store.Store, index);
      // console.log(nthlargest(Store, index));

      console.log('List of stores in function ' + store.Store[index].Name)
  
      if (index == 1 ) {
        this.store.ourPriceRating = 5
      }
      else if ( index == 2){
        this.store.ourPriceRating = 4
      }
      else if (index == 3){
        this.store.ourPriceRating = 3
      }
      else if (index == 4){
        this.store.ourPriceRating = 2
      }
      else if (index == 5){
        this.store.ourPriceRating = 1
      }
      else {
        this.store.ourPriceRating = 0 
      }
  
      this.calculateRatedTotal(this.store)
  }
  store.Store.sort(function(a, b){return b.ratedTotal - a.ratedTotal});
    return this.storeReturned
  }

  calculateRatedTotal(stores: Store){
    stores.ratedTotal = (stores.customerService + stores.ourPriceRating + stores.priceRating + stores.quality);

    return stores
  }
}
