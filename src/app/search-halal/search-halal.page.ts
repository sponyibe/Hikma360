import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';


import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators';

import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { Ingredient, IngredientService } from "../services/ingredient.service";

@Component({
  selector: "app-search-halal",
  templateUrl: "./search-halal.page.html",
  styleUrls: ["./search-halal.page.scss"]
})
export class SearchHalalPage implements OnInit{
  
  showResults = false;

  // Upload task
  task: AngularFireUploadTask;

  // Firestore data
  result$: Observable<any>;
  
  //loading: Loading;
  image: string;

  croppedImagepath = "";
  isLoading = false;

  public ingredient: Ingredient[];
  public loadedIngredientList: Ingredient[];

  searchTerm = '';

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private camera: Camera,
    private loading: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private ingservice: IngredientService
  ) {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Running AI vision analysis...'
    // });
  }

  ngOnInit() {
    this.ingservice.getIngredients().subscribe(ingredients => {
      this.ingredient = ingredients;
      this.loadedIngredientList = ingredients;
    });
  }

  //For Try 3
  initializeItems(): void {
    this.ingredient = this.loadedIngredientList;
  }

  filterList(event) {
    this.initializeItems();

    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.ingredient = this.ingredient.filter(currentItem => {
      if (currentItem.nonhalal && searchTerm) {
        if (
          currentItem.nonhalal.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

}
