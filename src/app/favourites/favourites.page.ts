import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourites, FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  private faves: Observable<Favourites[]>;

  constructor(private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.faves = this.favouritesService.getFavourites();
  }

}
