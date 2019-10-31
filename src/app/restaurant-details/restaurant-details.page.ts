import { Component, OnInit } from "@angular/core";
import { LocationsService, Restauarant } from "../services/locations.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: "app-restaurant-details",
  templateUrl: "./restaurant-details.page.html",
  styleUrls: ["./restaurant-details.page.scss"]
})
export class RestaurantDetailsPage implements OnInit {
  constructor(
    public locationService: LocationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inAppBrowser: InAppBrowser
  ) {}

  public places: Observable<Restauarant[]>;

  //public restaurant: Restauarant[];

  restaurants: Restauarant = {
    Name: '',
    Address: '',
    Region: '',
    SubRegions: '',
    Latitude: 0,
    Longitude: 0,
    PhoneNumber: '',
    HoursOfOperation: '',
    CertifiedBy: '',
    CuisneType: '',
    PriceRange: '',
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
      this.locationService.getIngredient(id).subscribe(restaurant => {
        this.restaurants = restaurant;
      });
    }
  }

  openWebsite(){
    this.inAppBrowser.create(this.restaurants.Website, '_system');
  }
  
}
