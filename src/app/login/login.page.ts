import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { NavController, NavParams, Events,ToastController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  hasVerifiedEmail = true;

  constructor(public navCtrl: NavController,public router:Router, public authService: AuthService, private ev: Events, public toastCtrl: ToastController,public afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
      userpassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])),
    })
   }

  ngOnInit() {
  }



  login(){
    //this.hasVerifiedEmail= this.afAuth.auth.currentUser.emailVerified;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.userpassword).then(value => {
      if (value){
          //this.router.navigateByUrl('/menu/home');
          this.hasVerifiedEmail= this.afAuth.auth.currentUser.emailVerified;
          this.ev.publish('loggedIn', value);
          if(this.hasVerifiedEmail){
            this.router.navigateByUrl('/menu/home');
          }
      }
      else{
        this.loginError();
        console.log("error")
      }
    })
  }

  async loginError(){
    let toast = await this.toastCtrl.create({message: 'Your Email or Password is incorrect. Please try again',
    duration: 3000,
    cssClass: 'toast-class',
    position: 'bottom'});
    toast.present();
  }
 

}
