import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { ModalController, IonList, AlertController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { AddItemPage } from '../add-item/add-item.page';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  private faves: Favourites[];
  private favesLoggedIn: Favourites[];
  private subscription: Subscription;
  public noFave: string

  @ViewChild('itemList') itemList: IonList;

  constructor(private favouritesService: FavouritesService, 
    private modalCtrl: ModalController, 
    private afAuth: AngularFireAuth,
    private alertController: AlertController ) {

  }

  ngOnInit() {
    console.log(firebase.auth().currentUser)
  }

  ionViewWillEnter() {
    this.subscription = this.favouritesService.getFavourites().subscribe(store => {
      this.faves = store;
      this.favesLoggedIn = this.faves.filter(fav => fav.userId == this.afAuth.auth.currentUser.uid)
      console.log(this.favesLoggedIn)
    })
  }


  async addItemModal(test) {
    const modal = await this.modalCtrl.create({
      component: AddItemPage,
      componentProps: {
        'sampleText': 'Lets Try this out'
      }
    });
    modal.present();
  }

  async update(test) {
    this.itemList.closeSlidingItems();
    console.log(test)

    const modal = await this.modalCtrl.create({
      component: AddItemPage,
      componentProps: {
        'updateItem': test.itemPurchased,
        'updateItemId': test.id
      }
    });
    modal.present();

  }

  async delete(test) {
    this.itemList.closeSlidingItems();
    console.log(test)

    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'This action cannot be undone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-class',
        }, {
          text: 'Delete',
          handler: () => {
            this.favouritesService.deleteFavouriteItem(test.id)
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() {
    console.log("Leave init")
    this.subscription.unsubscribe()
  }
}
