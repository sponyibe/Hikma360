import { Component } from "@angular/core";
import { GroceryStoresService, GroceryStores } from "../services/grocery-stores.service";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-grocery-store-details',
  templateUrl: './grocery-store-details.page.html',
  styleUrls: ['./grocery-store-details.page.scss'],
})
export class GroceryStoreDetailsPage {

  constructor(
    public groceryStoreService: GroceryStoresService,
    private activatedRoute: ActivatedRoute,
    private inAppBrowser: InAppBrowser
  ) {}

  public places: Observable<GroceryStores[]>;
  public subscription: Subscription;

  groceryStore: GroceryStores = {
    Name: '',
    Address: '',
    Region: '',
    SubRegions: '',
    Latitude: 0,
    Longitude: 0,
    PhoneNumber: '',
    HoursofOperation: '',
    CertifedBy: '',
    StoreType: '',
    Rating: 0,
    Notes: "",
    distance: "",
    Website: ""
  };

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.subscription = this.groceryStoreService.getGroceryStore(id).subscribe(groceryStore => {
        this.groceryStore = groceryStore;
      });
    }
  }

  openWebsite(){
    this.inAppBrowser.create(this.groceryStore.Website, '_system');
  }

  ionViweWillLeave(){
    this.subscription.unsubscribe()
  }
}
