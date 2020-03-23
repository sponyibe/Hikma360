import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  passedItem: ''
  passedId: ''

  favourite: Favourites = {
    itemPurchased: '',
    Store: [],
    userId: ''
  };

  constructor(private afAuth: AngularFireAuth ,private navParams: NavParams, private modalCtrl: ModalController, private favouritesService: FavouritesService, private toastCtrl: ToastController, private router:Router) {
    if (this.afAuth.auth.currentUser){
      this.favourite.userId = this.afAuth.auth.currentUser.uid
    }
   }

  ngOnInit() {
    this.favourite.itemPurchased = this.navParams.get('updateItem');
    this.passedId = this.navParams.get('updateItemId');
  }

  addItem(){
    this.favouritesService.addFavouriteItem(this.favourite).then(() =>{
      this.router.navigateByUrl('/favourites');
      this.showToast('Item added');
      this.closeModal();
    }, err => {
      this.showToast('There was a problem adding your item');
    });
  }

  updateItems(){
    this.favouritesService.updateFavouriteItem(this.passedId,this.favourite.itemPurchased).then(() =>{
      this.router.navigateByUrl('/favourites');
      this.showToast('Item added');
      this.closeModal();
    }, err => {
      this.showToast('There was a problem adding your item');
    })
  }
  
  showToast(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast-class'
    }).then(toast => toast.present());
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
