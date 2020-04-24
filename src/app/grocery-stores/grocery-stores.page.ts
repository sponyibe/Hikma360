import { Component, OnInit, ViewChild } from '@angular/core';
import { GroceryStoresService, GroceryStores } from "../services/grocery-stores.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController, Platform, ModalController, IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { FilterGroceryStoresPage } from '../filter-grocery-stores/filter-grocery-stores.page';

@Component({
  selector: 'app-grocery-stores',
  templateUrl: './grocery-stores.page.html',
  styleUrls: ['./grocery-stores.page.scss'],
})
export class GroceryStoresPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('search') searchBar: IonSearchbar

  private subscription: Subscription;
  public groceryStores: GroceryStores[];
  public data: GroceryStores[];
  public storeList: GroceryStores[];
  private numOfItemsToDisplay: number;

  usersLocation = {
    lat: 0,
    lng: 0
  }

  public option: string;
  public searchGroceryStores: '';
  public filteredList: GroceryStores[];

  constructor(
    public groceryStoreService: GroceryStoresService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    public geolocation: Geolocation,
    private platform: Platform) {

  }

  ngOnInit() {
    this.presentAlert('We currently only display grocery stores based in the Greater Toronto Area (GTA). Users outside the GTA would only be able to see the distance from their location to the closest grocery store in the GTA.')
  }

  ionViewWillEnter() {

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos) => {
        this.usersLocation.lat = pos.coords.latitude
        this.usersLocation.lng = pos.coords.longitude

        if (this.filteredList) {
          this.storeList = [...this.filteredList]
          return;
        }

        else if (this.groceryStoreService.groceryStoresData) {
          this.fastLoad()
          return;
        }

        this.subscription = this.groceryStoreService.getGroceryStores()
          .subscribe(groceryStoresList => {
            this.groceryStores = this.applyHaversine(groceryStoresList)

            this.groceryStores.sort(this.compare);

            this.groceryStoreService.groceryStoresData = [...this.groceryStores];
            this.storeList = this.groceryStoreService.groceryStoresData.slice(0, 25);
            this.numOfItemsToDisplay = 25;
          });
      });
    });
  }

  compare(a, b) {
    return a.distance - b.distance
  }

  initializeItems(): void {
    this.storeList = this.groceryStoreService.groceryStoresData.slice(0);
  }

  fastLoad() {
    this.storeList = [...this.groceryStoreService.groceryStoresData];

    this.storeList = this.groceryStoreService.groceryStoresData.slice(0, 24);
    this.numOfItemsToDisplay = 25;
  }

  filterListByName(event) {
    this.initializeItems();

    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      this.fastLoad()
      this.infiniteScroll.disabled = false
      return;
    } else {
      this.infiniteScroll.disabled = true
    }

    this.storeList = this.storeList.filter(grocer => {
      if (grocer.Name && searchTerm) {
        if (grocer.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async searchModal() {
    const modal = await this.modalCtrl.create({
      component: FilterGroceryStoresPage,
      componentProps: {
        'stores': this.groceryStoreService.groceryStoresData,
        'page': 'Grocery Stores'
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data['data'] === null) {
        this.fastLoad()
        this.infiniteScroll.disabled = false;
        this.searchBar.disabled = false;
      } else {
        this.infiniteScroll.disabled = true;
        this.searchBar.disabled = true;
        this.storeList = data['data']
        return this.filteredList = data['data']
      }
    });
    return await modal.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Notice',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  applyHaversine(locations: GroceryStores[]) {

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

  loadStoresData(event) {
    setTimeout(() => {
      this.storeList = this.storeList.concat(this.groceryStoreService.groceryStoresData.slice(this.numOfItemsToDisplay, this.numOfItemsToDisplay + 24));
      this.numOfItemsToDisplay += 25;

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.storeList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
