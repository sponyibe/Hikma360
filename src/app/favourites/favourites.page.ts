import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { ModalController, IonList, AlertController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { AddItemPage } from '../add-item/add-item.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {

  private faves: Favourites[];
  public favesLoggedIn: Favourites[];
  private subscription: Subscription;
  public noFave: string

  @ViewChild('itemList') itemList: IonList;

  constructor(
    private favouritesService: FavouritesService, 
    private modalCtrl: ModalController, 
    private afAuth: AngularFireAuth,
    private alertController: AlertController ) {
  }

  ionViewWillEnter() {
    this.subscription = this.favouritesService.getFavourites().subscribe(store => {
      this.faves = store;
      this.favesLoggedIn = this.faves.filter(fav => fav.userId == this.afAuth.auth.currentUser.uid)
    })
  }

  async addItemModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemPage,
      componentProps: {
        'sampleText': 'Lets Try this out'
      }
    });
    modal.present();
  }

  async update(itemToUpdate: Favourites) {
    this.itemList.closeSlidingItems();

    const modal = await this.modalCtrl.create({
      component: AddItemPage,
      componentProps: {
        'updateItem': itemToUpdate.itemPurchased,
        'updateItemId': itemToUpdate.id
      }
    });
    modal.present();

  }

  async delete(itemToDelete : Favourites) {
    this.itemList.closeSlidingItems();

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
            this.favouritesService.deleteFavouriteItem(itemToDelete.id)
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe()
  }
}
