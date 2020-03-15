import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Events,ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  authState: boolean = false;

  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'Search Halal',
      url: '/menu/search-halal',
      icon: 'search'
    },
    {
      title: 'My Favourites',
      url: '/favourites',
      icon: 'star'
    },   
    {
      title: 'FAQ',
      url: '/faq',
      icon: 'help'
    }

  ];

  constructor(public afAuth: AngularFireAuth, public ev: Events, private authService: AuthService, private agService: AuthGuardService,public router:Router,public toastCtrl: ToastController) {
    ev.subscribe('loggedIn', stateData => {
      console.log(stateData);
      this.authState = stateData
      console.log(this.authState)
    });
  }

  ngOnInit() {
    this.agService.doSomething().then(val => {
      this.authState = val;
      console.log(this.authState)
    });
  }

  logout() {
    this.authService.logout().then(value => {
      if (value){
        this.presentToast();
        this.router.navigateByUrl('/menu/home');
        this.authState = false;
      }
      else{
        console.log("error")
      }
    })
  }

   async presentToast(){
    let toast = await this.toastCtrl.create({message: 'Logged out',
    duration: 3000,
    position: 'bottom'});
    toast.present();
  }



}
