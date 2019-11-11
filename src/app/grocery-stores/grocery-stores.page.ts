import { Component, OnInit } from '@angular/core';
import { GroceryStoresService, GroceryStores } from "../services/grocery-stores.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-grocery-stores',
  templateUrl: './grocery-stores.page.html',
  styleUrls: ['./grocery-stores.page.scss'],
})
export class GroceryStoresPage implements OnInit {

  private subscription: Subscription;
  /// groceryStore: Observable<GroceryStores[]>;
  groceryStores: GroceryStores[];
  data: GroceryStores[];
  usersLocation = {
    lat: 0,
    lng: 0
  }
  constructor(public groceryStoreService: GroceryStoresService, public geolocation: Geolocation) { }

  ngOnInit() {
    //console.log("OnInit")
  }

  ionViewDidEnter() { 
    this.geolocation.getCurrentPosition().then((position) => {
      this.usersLocation.lat = position.coords.latitude
      this.usersLocation.lng = position.coords.longitude
    });
     
    this.subscription = this.groceryStoreService.getGroceryStores()
      .subscribe(groceryStoresList => {
        //this.places = restaurantList;
        // console.log(groceryStoresList)
        this.groceryStores = this.applyHaversine(groceryStoresList)

        this.groceryStores.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });
      });
  }

  applyHaversine(locations: GroceryStores[]) {

    console.log(this.usersLocation)

    // let usersLocation = {
    //   lat: 43.5134464,
    //   lng: -80.1988607
    // };

    locations.map((location) => {


      let placeLocation = {
        lat: location.Latitude,
        lng: location.Longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        this.usersLocation,
        placeLocation,
      ).toFixed(2);
    });
    // console.log(locations);
    return locations;
  }

  getDistanceBetweenPoints(start, end) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius.km;
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }

}
