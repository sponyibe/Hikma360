import { Component, OnInit } from '@angular/core';
import { GroceryStoresService, GroceryStores } from "../services/grocery-stores.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription  } from 'rxjs';
import { LoadingController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-grocery-stores',
  templateUrl: './grocery-stores.page.html',
  styleUrls: ['./grocery-stores.page.scss'],
})
export class GroceryStoresPage implements OnInit {

  private subscription: Subscription;
  public groceryStores: GroceryStores[];
  public data: GroceryStores[];
  public storeList: GroceryStores[];
  private numOfItemsToDisplay: number;

  usersLocation = {
    lat: 0,
    lng: 0
  }
  constructor(public groceryStoreService: GroceryStoresService, 
    private alertController: AlertController,
    public geolocation: Geolocation,
    private platform: Platform) { 

    }

  ngOnInit() {
    
  }

  ionViewWillEnter() { 
    
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((position) => {
        this.usersLocation.lat = position.coords.latitude
        this.usersLocation.lng = position.coords.longitude
      });
    });
    
     if (this.groceryStoreService.groceryStoresData) {
      this.data = this.groceryStoreService.groceryStoresData;
      
      this.storeList = this.data.slice(0, 24);
      this.numOfItemsToDisplay = 25;
      return;
    }

    this.subscription = this.groceryStoreService.getGroceryStores()
      .subscribe(groceryStoresList => {
        this.groceryStores = this.applyHaversine(groceryStoresList)

        this.groceryStores.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });
        this.data = this.groceryStores.filter(i => i.distance < 100)

        this.groceryStoreService.groceryStoresData  = this.data;
        this.storeList = this.data.slice(0, 25);
        this.numOfItemsToDisplay = 25;

        if(this.data.length <= 0){
          this.presentAlert("Sorry, there are no grocery stores within 100km of your current location")
        }
      });
     
  }

async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  applyHaversine(locations: GroceryStores[]) {

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

  loadStoresData(event){
    setTimeout(() => {
      console.log('Done');
      this.storeList = this.storeList.concat(this.data.slice(this.numOfItemsToDisplay, this.numOfItemsToDisplay + 24));
      this.numOfItemsToDisplay += 25;

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.storeList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }

}
