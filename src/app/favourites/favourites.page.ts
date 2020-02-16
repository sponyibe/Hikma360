import { Component, OnInit } from '@angular/core';
import { Subscription  } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { ModalController } from '@ionic/angular';
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

  constructor(private favouritesService: FavouritesService, private modalCtrl: ModalController, private afAuth: AngularFireAuth) { 
    
  }

  ngOnInit() {
    console.log(firebase.auth().currentUser)
  }

  ionViewWillEnter() { 
    this.subscription =  this.favouritesService.getFavourites().subscribe(store => {
      this.faves = store;
      this.favesLoggedIn =  this.faves.filter(fav => fav.userId == this.afAuth.auth.currentUser.uid)
      console.log(this.favesLoggedIn)
    })
  }


  async addItemModal(){
    const modal =  await this.modalCtrl.create({
      component: AddItemPage,
      componentProps: {
        'sampleText': 'Lets Try this out'
      }
    });
    modal.present();
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }
}
