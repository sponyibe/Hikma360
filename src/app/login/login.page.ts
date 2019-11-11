import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { NavController, NavParams } from '@ionic/angular';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  //
  async login(){
    const {username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      if(res){
        console.log("Successfully logged in!");
        this.router.navigateByUrl('/menu/home');
        
      }
    } catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("user not found")
      }
    }
  }

}
