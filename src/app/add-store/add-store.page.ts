import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private favouritesService: FavouritesService,
    private toastCtrl: ToastController,
    private router: Router
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
      this.router.navigateByUrl('/favourites');
      this.showToast('Store added');
    }, err => {
      this.showToast('There was a problem adding your favourite store');
    });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
