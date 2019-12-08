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

  passedText: ''

  favourite: Favourites = {
    itemPurchased: '',
    Store: [],
    userId: ''
  };
  constructor(private afAuth: AngularFireAuth ,private navParams: NavParams, private modalCtrl: ModalController, private favouritesService: FavouritesService, private toastCtrl: ToastController, private router:Router) {
    if (this.afAuth.auth.currentUser){
      this.favourite.userId = this.afAuth.auth.currentUser.uid
      console.log(this.favourite.userId)
    }
   }

  ngOnInit() {
    this.passedText = this.navParams.get('sampleText');
  }

  addItem(){
    this.favouritesService.addFavouriteItem(this.favourite).then(() =>{
      this.router.navigateByUrl('/favourites');
      this.showToast('Store added');
    }, err => {
      this.showToast('There was a problem adding your favourite store');
    });
  }
  
  showToast(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
