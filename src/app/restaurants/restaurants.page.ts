import { Component, OnInit } from '@angular/core';
import { LocationsService, Restauarant } from "../services/locations.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit{

  private subscription: Subscription;
  place: Observable<Restauarant[]>;
  places: Restauarant[];
  data: Restauarant[];
  usersLocation = {
    lat: 0,
    lng: 0
  }
  constructor(public locationService: LocationsService, public geolocation: Geolocation) { }

  ngOnInit() {
    //console.log("OnInit")
  }

  ionViewDidEnter() { 
    this.geolocation.getCurrentPosition().then((position) => {
      this.usersLocation.lat = position.coords.latitude
      this.usersLocation.lng = position.coords.longitude
    });
     
    this.subscription = this.locationService.getLocations()
      .subscribe(restaurantList => {
        //this.places = restaurantList;
        console.log(restaurantList)
        this.places = this.applyHaversine(restaurantList)

        this.places.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });
      });
  }

  applyHaversine(locations: Restauarant[]) {

    console.log(this.usersLocation)

    // let usersLocation = {
    //   lat: 43.5134464,
    //   lng: -80.1988607
    // };

    locations.map((location) => {


      let placeLocation = {
        lat: location.Latitude,
        lng: location.Longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        this.usersLocation,
        placeLocation,
      ).toFixed(2);
    });
    // console.log(locations);
    return locations;
  }

  getDistanceBetweenPoints(start, end) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius.km;
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  ionViewWillLeave(){
    console.log("Leave init")
    this.subscription.unsubscribe()
  }

}
