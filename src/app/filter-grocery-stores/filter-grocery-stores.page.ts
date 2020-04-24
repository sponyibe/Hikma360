import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonRadioGroup } from '@ionic/angular';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../services/locations.service';

@Component({
  selector: 'app-filter-grocery-stores',
  templateUrl: './filter-grocery-stores.page.html',
  styleUrls: ['./filter-grocery-stores.page.scss'],
})
export class FilterGroceryStoresPage implements OnInit {

  public passedInfo
  public passedRestaurants: Restaurant[]
  public passedInfoCopy
  passedPage: string
  public uniqueArr: string[]
  public more: string[]
  public numToAdd: number = 5

  @ViewChild('storeTypeGroup') storeTypeGroup: IonRadioGroup
  @ViewChild('ratingGroup') ratingGroup: IonRadioGroup

  //Get value on ionChange on IonRadioGroup
  selectedRadioRating: number;
  //Get value on ionSelect on IonRadio item
  selectedRadioStoreType: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.passedInfo = this.navParams.get('stores');
    this.passedPage = this.navParams.get('page');
    if (this.passedPage === 'Grocery Stores') {
      this.uniqueArr = Array.from(new Set(this.passedInfo.map(data => data.StoreType)))
    }else if (this.passedPage === 'Restaurants'){
      this.uniqueArr = Array.from(new Set(this.passedInfo.map(data => data.CuisneType)))
    }
    this.more = this.uniqueArr.sort().slice(0, 4)
  }

  initializeItems(): void {
    this.passedInfoCopy = this.passedInfo.slice(0);
  }

  async storeTypeSelected(type) {
    this.selectedRadioStoreType = type;
    
    if(this.passedPage === 'Grocery Stores'){
    this.passedInfoCopy = this.passedInfoCopy.filter(grocer => {
      if (grocer.StoreType && this.selectedRadioStoreType) {
        if (grocer.StoreType.toLowerCase().indexOf(this.selectedRadioStoreType.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }else if (this.passedPage === 'Restaurants'){
    this.passedInfoCopy = this.passedInfoCopy.filter(restaurant => {
      if (restaurant.CuisneType && this.selectedRadioStoreType) {
        if (restaurant.CuisneType.toLowerCase().indexOf(this.selectedRadioStoreType.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
    this.passedInfoCopy.length
  }

  async ratingSelected(evt) {
    this.selectedRadioRating = parseInt(evt);

    this.passedInfoCopy = this.passedInfoCopy.filter(grocer => {
      return grocer.Rating >= this.selectedRadioRating && grocer.Rating <= this.selectedRadioRating + 0.9
    });
    this.passedInfoCopy.length
  }

  addMore() {
    if (this.numToAdd >= this.uniqueArr.length) {
    } else {
      this.more = this.more.concat(this.uniqueArr.slice(this.numToAdd, this.numToAdd + 5))
      this.numToAdd += 5
    }
  }

  viewLess() {
    this.more = this.uniqueArr.sort().slice(0, 4)
  }

  filterSearch() {
    this.initializeItems()
    var search: boolean

    if(this.storeTypeGroup.value){
      this.storeTypeSelected(this.storeTypeGroup.value)
      search = true;
    }
    if(this.ratingGroup.value >= 0){
      this.ratingSelected(this.ratingGroup.value)
      search = true;
    }

    if (search) {
      this.modalCtrl.dismiss(this.passedInfoCopy);
    } else {
      this.modalCtrl.dismiss(null);
    }
  }

  close(){
    this.modalCtrl.dismiss(null);
  }
}
