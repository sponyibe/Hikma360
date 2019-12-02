import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },

    {
      title: 'Search Halal',
      url: '/menu/search-halal'
    }
    

  ];
  
  constructor() { }

  ngOnInit() {
  }

}
