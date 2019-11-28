import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { AddItemPage } from '../add-item/add-item.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  private faves: Favourites[];
  private favesLoggedIn: Favourites[];

  constructor(private favouritesService: FavouritesService, private modalCtrl: ModalController, private afAuth: AngularFireAuth ) { }

  ngOnInit() {
    this.favouritesService.getFavourites().subscribe(store => {
      this.faves = store;
      this.favesLoggedIn =  this.faves.filter(fav => fav.userId == this.afAuth.auth.currentUser.uid)
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
}
