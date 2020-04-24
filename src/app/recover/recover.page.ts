import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController,NavController, NavParams, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {
   email: string = ""

  recoverForm: FormGroup;

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth, private ev: Events, public toastCtrl: ToastController) { 
     
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
    duration: 4000,
    position: 'bottom'});
    toast.present();
  }
}
