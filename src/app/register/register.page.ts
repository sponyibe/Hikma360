import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { Router, Routes } from '@angular/router';
import { NavController} from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  registrationForm: FormGroup;

  constructor(public navCtrl: NavController,public router:Router, public afAuth: AngularFireAuth) { 
        this.registrationForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
        useremail: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
        userpassword: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
       ])),
       confirmpassword: new FormControl('', Validators.required)
      })
  }
  
  ngOnInit() {
  }

  async register() {
    console.log(this.registrationForm.value.username);
    //const {email, password, cpassword} = this
    if(this.registrationForm.value.userpassword !== this.registrationForm.value.confirmpassword){
      return console.error("Passwowrd don't match");
      
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.registrationForm.value.useremail, this.registrationForm.value.userpassword)
    //  console.log("email: "+email);
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