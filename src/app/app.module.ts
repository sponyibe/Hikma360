import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { Network } from "@ionic-native/network/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { AddItemPageModule } from './add-item/add-item.module';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterGroceryStoresPageModule } from './filter-grocery-stores/filter-grocery-stores.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FilterGroceryStoresPageModule,
    AddItemPageModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Network,
    Geolocation,
    InAppBrowser,
    Diagnostic,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }