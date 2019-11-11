import { Component, OnInit } from "@angular/core";
import { GroceryStoresService, GroceryStores } from "../services/grocery-stores.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-grocery-store-details',
  templateUrl: './grocery-store-details.page.html',
  styleUrls: ['./grocery-store-details.page.scss'],
})
export class GroceryStoreDetailsPage implements OnInit {

  constructor(
    public groceryStoreService: GroceryStoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inAppBrowser: InAppBrowser
  ) {}

  public places: Observable<GroceryStores[]>;

  //public restaurant: Restauarant[];

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

  ngOnInit() {
    //this.places = this.locationService.getLocations();
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.groceryStoreService.getGroceryStore(id).subscribe(groceryStore => {
        this.groceryStore = groceryStore;
      });
    }
  }

  openWebsite(){
    this.inAppBrowser.create(this.groceryStore.Website, '_system');
  }
  

}
