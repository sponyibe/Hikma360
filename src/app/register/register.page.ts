import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { Router, Routes } from '@angular/router';
import { auth } from "firebase/app";
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register() {
    const {email, password, cpassword} = this
    if(password !== cpassword){
      return console.error("Passwowrd don't match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      if (res) {
        console.log("Successfully registered!");
        this.router.navigateByUrl('/menu/home');
      }
    }catch(error){
      console.dir(error)
    }
  }
}