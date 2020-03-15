import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController,ToastController,NavController, NavParams, Events } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
   email: string = ""

  recoverForm: FormGroup;

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth, private ev: Events, public toastCtrl: ToastController) { 
     
  }

  ngOnInit() {
  }

  async recover(){
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(value => {
        console.log(value);
        this.presentToast();
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.dir(err);
        
      });
  }

  async presentToast(){
    let toast = await this.toastCtrl.create({message: 'Password reset email sent',
    duration: 1000,
    position: 'bottom'});
    toast.present();
  }
}
