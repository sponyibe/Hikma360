import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: "app-tenets",
  templateUrl: "./tenets.page.html",
  styleUrls: ["./tenets.page.scss"]
})
export class TenetsPage implements OnInit {
  constructor(public platform : Platform) {}

  ngOnInit() {}
}
