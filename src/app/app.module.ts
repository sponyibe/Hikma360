import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { Network } from "@ionic-native/network/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { AngularFireAuthGuard} from '@angular/fire/auth-guard';

//import { AngularCropperjsModule } from 'angular-cropperjs';
import { Camera } from '@ionic-native/camera/ngx';
import { AddItemPageModule } from './add-item/add-item.module';
//import { Crop } from '@ionic-native/crop/ngx';
//import { File } from '@ionic-native/file/ngx';

import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AddItemPageModule
    // AngularCropperjsModule,
    // NgAisModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireStorage,
//    AngularFireAuthGuard,
    Camera,
    Network,
    Geolocation,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }