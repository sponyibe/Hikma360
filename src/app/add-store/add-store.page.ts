import { Component, OnInit } from "@angular/core";
import { ToastController, NavController} from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { FavouritesService, Favourites, Store } from "../services/favourites.service";

@Component({
  selector: "app-add-store",
  templateUrl: "./add-store.page.html",
  styleUrls: ["./add-store.page.scss"]
})
export class AddStorePage implements OnInit {
  store: Store = {
    Name: "",
    datePurchased: "",
    pricePerUnit: 0,
    priceRating: 0,
    quality: 0,
    customerService: 0
  };

  favourites: Favourites = {
  itemPurchased: "",
  Store: [{Name: 'ghh',
  datePurchased: 'hjjj',
  pricePerUnit: 4,
  priceRating: 4,
  quality:2,
  customerService: 3}],
  userId: ''
 }
  id; index;
  isUpdatingStore: boolean;

  private storeReturned: Favourites

  constructor(
    private activatedRoute: ActivatedRoute,
    private favouritesService: FavouritesService,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.index = this.activatedRoute.snapshot.paramMap.get("index");
    this.isUpdatingStore = false;

    if (this.id) {
      console.log(this.id)
      this.favouritesService.getFavouritesDetails(this.id).subscribe(store => {
        this.favourites = store;
        this.favourites.Store = store.Store
        // console.log(store);
      });
    }
    if (this.index) {
      console.log(this.index)
      this.isUpdatingStore = true;

      this.favouritesService.getStoreDetails(this.id,this.index).subscribe(store => {
        this.favourites.Store[this.index] = store;
        console.log(this.favourites.Store[this.index]);

        this.store = this.favourites.Store[this.index];
      });
    }
  }

  addStore() {
    this.favourites.Store.push(this.store)
    console.log(this.favourites.Store);
    this.favouritesService.addStore(this.favourites).then(() =>{
      if (this.favourites.Store.length >= 3) {
        this.calculateOurPriceRating(this.favourites)
      }
      this.navCtrl.navigateBack('/favourite-store/' + this.id);
      this.showToast('Store added');
    }, err => {
      this.showToast('There was a problem adding your favourite store');
    });
  }

  updateStore(){
    this.favouritesService.addStore(this.favourites).then(() =>{
      if (this.favourites.Store.length >= 3) {
        this.calculateOurPriceRating(this.favourites)
      }
      this.navCtrl.navigateBack('/favourite-store/' + this.id);
      this.showToast('Store updated');
    }, err =>{
      this.showToast('There was a problem updating the store');
    });
  }

  deleteStore(){
    this.favouritesService.deleteFavouriteSortedStore(this.favourites, this.index).then(() =>{
      this.router.navigateByUrl('/favourite-store/' + this.id);
      this.showToast('Store deleted');
    }, err =>{
      this.showToast('There was a problem deleting the store');
    });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

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
						
						if(parseFloat(arra[x].pricePerUnit) > parseFloat(arra[i].pricePerUnit)){
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
    for (let index = 0; index < store.Store.length; index++) {
      this.store = this.lowestPrice(store.Store, index+1);

      console.log('List of stores in function ' + store.Store[index].Name)
  
      if (index+1 == 1 ) {
        this.store.ourPriceRating = 5
      }
      else if ( index+1 == 2){
        this.store.ourPriceRating = 4
      }
      else if (index+1 == 3){
        this.store.ourPriceRating = 3
      }
      else if (index+1 == 4){
        this.store.ourPriceRating = 2
      }
      else if (index+1 == 5){
        this.store.ourPriceRating = 1
      }
      else {
        this.store.ourPriceRating = 0 
      }
  
      this.calculateRatedTotal(this.store)
  }
  store.Store.sort(function(a, b){return b.ratedTotal - a.ratedTotal});
  
  this.favouritesService.clearStore(this.favourites, this.favourites.userId)

  for (let index2 = 0; index2 < store.Store.length; index2++) {
    this.favouritesService.addSortedStore(this.favourites, index2);
  }
    return this.storeReturned
  }

  calculateRatedTotal(stores: Store){
    stores.ratedTotal = (stores.customerService + stores.ourPriceRating + stores.priceRating + stores.quality);

    return stores
  }

}
