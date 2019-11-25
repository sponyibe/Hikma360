import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';
import { ModalController } from '@ionic/angular';
import { AddItemPage } from '../add-item/add-item.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  private faves: Observable<Favourites[]>;

  fav: Favourites =  {
    id: '',
    Store: [],
    userId: '',
    itemPurchased: ''
  }

  constructor(private favouritesService: FavouritesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.faves = this.favouritesService.getFavourites();
    // this.favouritesService.getFavourites().subscribe(store => {
    //   this.fav = store;
    //   console.log(this.fav);
    // })
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
