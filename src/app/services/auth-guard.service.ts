import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { first } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  authenticated: Boolean

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    console.log("auth state: " + this.doSomething().then(val => console.log(val)))

    this.doSomething().then(val => {
      this.authenticated = val;
      if(!this.authenticated){
        this.router.navigate(["login"]);
        return false;
      }
      else return true;
    })
    return true;
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      return true;
    } else {
      return false;
    }
  }

}
