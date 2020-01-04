import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth) {}

  async login(email:string, password:string){

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      if(res){
        console.log("Successfully logged in!");
        return true;
      }
    } catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("user not found")
      }
      return false;
    }

  }

  async logout() {
    try {
      const res = await this.afAuth.auth.signOut();
      console.log("user logged out")
      return true
    } catch(err){
      console.dir(err)
      if(err.code){
        console.log("user not logged in")
      }
    }
    return false
  }

  register(email:string, password:string){

  }
 
}