import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, Routes } from '@angular/router';
import { NavController, AlertController, ToastController, NavParams, Events } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import * as firebase from 'firebase/app'
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  email: string = ""
  password: string = ""
  updateForm: FormGroup;
  public user : string = firebase.auth().currentUser.email ;

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth,private ev: Events, public toastCtrl: ToastController) { }

  ngOnInit() {
    
  }

  

  updateEmail(){
      this.afAuth.auth.currentUser.updateEmail(this.email)
      .then(() => {
        this.email = '';
        this.afAuth.auth.currentUser.sendEmailVerification();
        this.presentEmailToast();
      })
      .catch(err => {
        this.presentError();
        console.log("Did not work");
        console.dir(err);  
      });
  }

  updatePassword(){
     this.afAuth.auth.currentUser.updatePassword(this.password)
        .then(() => {
          this.password = '';
          this.presentPasswordToast();
        })
        .catch(err => {
          console.log("Did not work");
          console.dir(err);
        });
  }

  async presentEmailToast(){
    let toast = await this.toastCtrl.create({message: 'Email updated.Please check your email and verify your account.',
    duration: 5000,
    position: 'bottom'});
    toast.present();
  }
 
  async presentPasswordToast(){
    let toast = await this.toastCtrl.create({message: 'Password updated',
    duration: 3000,
    position: 'bottom'});
    toast.present();
  }

  async presentError(){
    let toast = await this.toastCtrl.create({message: 'This operation requires recent authentication. Login again before retrying this request.',
    duration: 8000,
    position: 'middle'});
    toast.present();
  }

}
