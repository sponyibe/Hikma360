import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService, Restaurant } from "../services/locations.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { AlertController, NavController, Platform, ModalController, IonSearchbar } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { FilterGroceryStoresPage } from '../filter-grocery-stores/filter-grocery-stores.page';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchBar') searchBar: IonSearchbar;

  private subscription: Subscription;
  public places: Restaurant[];
  public data: Restaurant[];
  public dataList: Restaurant[];
  private numOfItemsDisplaying: number;

  public usersLocation = {
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
    private platform: Platform,
    public modalCtrl: ModalController) { }

  ionViewWillEnter() {

    this.presentAlert('We currently only display restaurants based in the Greater Toronto Area (GTA). Users outside the GTA would only be able to see the distance from their location to the closest restaurant in the GTA')

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
        this.usersLocation.lat = position.coords.latitude
        this.usersLocation.lng = position.coords.longitude

        if(this.filtered){
          console.log(this.filtered)
          this.dataList = [...this.filtered]
          return;
        }

        else if (this.locationService.restaurantData) {
          this.fastLoadRestaurants()
          return;
        }
    
        this.subscription = this.locationService.getLocations()
          .subscribe(restaurantList => {
            // this.places = restaurantList;
            this.places = this.applyHaversine(restaurantList)
    
            this.places.sort(this.compare);
            // this.data = [...this.places.filter(i => i.distance < 100)]
    
            this.locationService.restaurantData = [...this.places];
            this.dataList = this.locationService.restaurantData.slice(0, 25);
            this.numOfItemsDisplaying = 25;
    
            // if (this.data.length <= 0) {
            //   this.presentAlert("Sorry, there are no restaurants within 100km of your current location")
            // }
            this.filtered = this.places.slice(0);
          })
      });
    });    
  }

  compare(a, b) {
    return a.distance - b.distance
  }

  loadData(event) {
    setTimeout(() => {
      this.dataList = this.dataList.concat(this.locationService.restaurantData.slice(this.numOfItemsDisplaying, this.numOfItemsDisplaying + 24));
      this.numOfItemsDisplaying += 25;

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  initializeRestaurantList(): void {
    this.dataList = this.locationService.restaurantData.slice(0);
  }

  fastLoadRestaurants(){
    console.log('in fastLoad')
    this.dataList = [...this.locationService.restaurantData];

    this.dataList = this.locationService.restaurantData.slice(0, 24);
    this.numOfItemsDisplaying = 25;
  }

  async searchModal() {
    const modal = await this.modalCtrl.create({
      component: FilterGroceryStoresPage,
      componentProps: {
        'stores': this.locationService.restaurantData,
        'page': 'Restaurants'
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data['data'] === null){
        this.fastLoadRestaurants()
        this.infiniteScroll.disabled = false;
        this.searchBar.disabled = false;
      }else{
        this.infiniteScroll.disabled = true;
        this.searchBar.disabled = true;
        this.dataList = data['data']
        return this.filtered = data['data']
      }
    });
    return await modal.present();
  }

  searchRestaurantByName(evt){
    this.initializeRestaurantList();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.dataList = this.dataList.filter(grocer => {
      if (grocer.Name && searchTerm) {
        if (grocer.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Notice',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  applyHaversine(locations: Restaurant[]) {

    // console.log(this.usersLocation)
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

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  clearSearch() {
    this.toggleInfiniteScroll()
    this.top = ""
    this.search = ""
    this.data = this.locationService.restaurantData;

    this.dataList = this.data.slice(0, 24);
    this.numOfItemsDisplaying = 25;
    // this.filtered = this.data.slice(0);
  }

  ionViewWillLeave() {
    console.log("Leave init")
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
