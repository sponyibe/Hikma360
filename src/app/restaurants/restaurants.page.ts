import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService, Restaurant } from "../services/locations.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private subscription: Subscription;
  public places: Restaurant[];
  public data: Restaurant[];
  public dataList: Restaurant[];
  private numOfItemsDisplaying: number;

  usersLocation = {
    lat: 0,
    lng: 0
  }

  public top: string;
  public search: any;
  public filtered: Restaurant[];

  constructor(public locationService: LocationsService,
    public geolocation: Geolocation,
    private alertController: AlertController,
    public router: Router, 
    private platform: Platform) { }

  ionViewWillEnter() {

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
        this.usersLocation.lat = position.coords.latitude
        this.usersLocation.lng = position.coords.longitude
      });
    });

    if (this.locationService.restaurantData) {
      this.data = this.locationService.restaurantData;

      this.dataList = this.data.slice(0, 24);
      this.numOfItemsDisplaying = 25;
      this.filtered = this.data.slice(0);
      return;
    }

    this.locationService.getLocations()
      .subscribe(restaurantList => {
        // this.places = restaurantList;
        this.places = this.applyHaversine(restaurantList)

        this.places.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });
        this.data = this.places.filter(i => i.distance < 100)

        this.locationService.restaurantData = this.data;
        this.dataList = this.data.slice(0, 25);
        this.numOfItemsDisplaying = 25;

        // if (this.data.length <= 0) {
        //   this.presentAlert("Sorry, there are no restaurants within 100km of your current location")
        // }
        this.filtered = this.data.slice(0);
      });
  }

  searchRestaurantList(){
    console.log(this.top)
    console.log(this.search)
    this.dataList = this.filtered;

    this.toggleInfiniteScroll()

    if(this.top == "cuisine"){
      const sample = this.filtered.filter(
        (thing, i, arr) => arr.findIndex(t => t.CuisneType === thing.CuisneType) === i);

      this.dataList = this.filtered.filter( type =>
        type.CuisneType.toLowerCase() == this.search.toLowerCase()
      )
      // console.log(this.dataList);
    }
    if(this.top == "rating"){
      const sample = this.filtered.filter(
        (thing, i, arr) => arr.findIndex(t => t.Rating === thing.Rating) === i);

      this.dataList = this.filtered.filter( type =>
        type.Rating == this.search
      )
      // console.log(this.dataList);
    }
    if(this.top == "name"){
      const sample = this.filtered.filter(
        (thing, i, arr) => arr.findIndex(t => t.Name === thing.Name) === i);

      this.dataList = this.filtered.filter( type =>
        type.Name.toLowerCase() == this.search.toLowerCase()
      )
      // console.log(this.dataList);
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  applyHaversine(locations: Restaurant[]) {

    console.log(this.usersLocation)

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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.dataList = this.dataList.concat(this.data.slice(this.numOfItemsDisplaying, this.numOfItemsDisplaying + 24));
      this.numOfItemsDisplaying += 25;

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  clearSearch(){
    this.toggleInfiniteScroll()
    this.top = ""
    this.search = ""
    this.data = this.locationService.restaurantData;

    this.dataList = this.data.slice(0, 24);
    this.numOfItemsDisplaying = 25;
    // this.filtered = this.data.slice(0);
  }

  // ionViewWillUnload() {
  //   console.log("Leave init")
  //   this.subscription.unsubscribe()
  // }

}
