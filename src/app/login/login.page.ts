import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { NavController, NavParams, Events } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public navCtrl: NavController,public router:Router, public authService: AuthService, private ev: Events) { }

  ngOnInit() {
  }

  //
  /* async login(){
    const {username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      if(res){
        console.log("Successfully logged in!");
        this.router.navigateByUrl('/menu/home');
      }
      this.loggedIn = true;
    } catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("user not found")
      }
    }
  } */

  login(){
    this.authService.login(this.username, this.password).then(value => {
      if (value){
        this.router.navigateByUrl('/menu/home');
        this.ev.publish('loggedIn', value);
      }
      else{
        console.log("error")
      }
    })
  }

}
