import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";

declare var Connection: any;

@Injectable({
  providedIn: "root"
})
export class ConnectivityService {
  constructor(public platform: Platform, private network: Network) {}

  isOnline(): boolean {
    if (this.platform.is("cordova") && this.network.Connection) {
      //watch network for a connection
      console.log("in here 1");
      let connectSubscription = this.network.onConnect().subscribe(() => {
        console.log("network connected!");
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          console.log("we got a " + this.network.type + "connection");
        }, 3000);
        return true;
      });
      // stop connect watch
      connectSubscription.unsubscribe();
    } else {
      console.log(navigator.onLine);
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    console.log("No Connected");
    if (this.platform.is("cordova") && this.network.Connection) {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log("network was disconnected :-(");
        return false;
      });
      // stop disconnect watch
      disconnectSubscription.unsubscribe();
    } else {
      console.log(navigator.onLine);
      return !navigator.onLine;
    }
  }
}
