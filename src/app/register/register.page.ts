import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { Router, Routes } from '@angular/router';
import { NavController,ToastController} from '@ionic/angular';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
  email: string = ""
 // password: string = ""
  cpassword: string = ""

  registrationForm: FormGroup;
 // cbox= new FormControl(undefined,[Validators.required]);
  //hasVerifiedEmail = true;

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth,public toastCtrl: ToastController) { 
        this.registrationForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
     //   cbox: new FormControl([false, RegisterPage.mustBeTruthy]),
        cbox: new FormControl(undefined,[Validators.requiredTrue]),
        useremail: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
       ])),
       confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    }, { 
      validators: this.password.bind(this)
      })
  }
  
  ngOnInit() {
  }

  async register() {
    console.log(this.registrationForm.value.username);
    //const {email, password, cpassword} = this
    if(this.registrationForm.value.password !== this.registrationForm.value.confirmpassword){
      return console.error("Passwowrd don't match");
     // this.errorToast();
      
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.registrationForm.value.useremail, this.registrationForm.value.password)
    //  console.log("email: "+email);
      console.log(res)
      if (res) {
        console.log("Successfully registered!");
        this.registerToast();
        this.afAuth.auth.currentUser.sendEmailVerification();
       // this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
           this.router.navigateByUrl('/login');
      }
    }catch(error){
      console.dir(error);
     // let toast = await this.toastCtrl.create({message: error,
       // duration: 5000,
        //position: 'middle'});
      //  toast.present();
      this.errorToast();
    }
  }

  async registerToast(){
    let toast = await this.toastCtrl.create({message: 'Successfully Registered! Please check your email and verify your account.',
    duration: 5000,
    position: 'middle'});
    toast.present();
  }
  async errorToast(){
    let toast = await this.toastCtrl.create({message: 'Check your credentials and ensure your passwords match.',
    duration: 5000,
    position: 'middle'});
    toast.present();
  }
  
  password(formGroup: FormGroup){
    const { value:password } = formGroup.get('password');
    const { value: confirmpassword } = formGroup.get("confirmpassword");
    return password === confirmpassword ? null : { passwordNotMatch : true};

  }

}