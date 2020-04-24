import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-terms',
  templateUrl: './register-terms.page.html',
  styleUrls: ['./register-terms.page.scss'],
})
export class RegisterTermsPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  close(){
    this.router.navigateByUrl('/register');
  }

}
