import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string = "AIzaSyCtXHLzBEan2Uk0bllexu_NMBoQSWvdK7k";

  constructor(public Connectivity: ConnectivityService, private geolocation: Geolocation) { }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.Connectivity.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if (this.Connectivity.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });
  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve, reject) => {

      this.geolocation.getCurrentPosition().then((position) => {

        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //let latLng = new google.maps.LatLng(43.636327, -79.623338);

        let mapOptions = {
          center: latLng,
          zoom: 12,
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });
      setTimeout(() => {
        reject(new Error('this is an error'));
      }, 1000);

    });

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  addMarker(lat: number, lng: number): void {
    console.log(lat + '+' + lng);

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

  }
}
