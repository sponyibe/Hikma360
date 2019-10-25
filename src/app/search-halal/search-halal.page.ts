import { Component, ViewChild, OnInit } from "@angular/core";
import { LoadingController, ActionSheetController } from "@ionic/angular";

import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { environment } from "../../environments/environment";

import {
  Camera,
  CameraOptions,
  PictureSourceType
} from "@ionic-native/camera/ngx";
// import { Plugins, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
// const { Camera } = Plugins;

import { Ingredient, IngredientService } from "../services/ingredient.service";

@Component({
  selector: "app-search-halal",
  templateUrl: "./search-halal.page.html",
  styleUrls: ["./search-halal.page.scss"]
})
export class SearchHalalPage implements OnInit {
  // searchConfig = {
  //   ...environment.algolia,
  //   indexName: "dev_Items"
  // };

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
  // For try 2
  searchTerm = "";
  /*notes = '';
  isHalal: boolean;
  showBody: boolean;
 */
  constructor(
    private storage: AngularFireStorage,
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

  // For Try 1
  // searchChange(query) {
  //   if (query.length) {
  //     this.showResults = true;
  //   } else {
  //     this.showResults = false;
  //   }
  // }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Use Library",
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
            // this.camera.PictureSourceType.PHOTOLIBRARY
          }
        },
        {
          text: "Capture Image",
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.CAMERA);
            //this.camera.PictureSourceType.CAMERA
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  startUpload(file: string) {
    // Show loader
    //this.loading.present();

    // const timestamp = new Date().getTime().toString();
    const docId = this.afs.createId();

    const path = `${docId}.jpg`;

    // Make a reference to the future location of the firestore document
    const photoRef = this.afs.collection("photos").doc(docId);

    // Firestore observable, dismiss loader when data is available
    this.result$ = photoRef.valueChanges().pipe(
      filter(data => !!data),
      tap()
    );

    // The main task
    this.image = "data:image/jpg;base64," + file;
    this.task = this.storage.ref(path).putString(this.image, "data_url");
  }

  // Gets the pic from the native camera then starts the upload
  async captureAndUpload(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      allowEdit: true
    };

    const base64 = await this.camera.getPicture(options);
    this.startUpload(base64);
  }

  //For Try 2
  /* getList() {
    console.log("in list")
    this.showBody = true;
    this.ingservice.getIngredients()
      .subscribe(ingredients => {
        this.ingredient = ingredients
        console.log(ingredients.length);
        console.log(this.searchTerm.length)
        for (let i = 0; i < ingredients.length; i++) {
          if (ingredients[i].Item.includes(this.searchTerm.toLowerCase())) {
            this.isHalal = false;
            console.log(this.searchTerm);
            console.log('Non halal item: ' + ingredients[i].Item);
            //this.notes = ingredients[i].notes;
            return this.isHalal;
          }
          else {
            this.isHalal = true;
            console.log(this.searchTerm);
            console.log('Halal item: ' + ingredients[i].Item);
          }
        };
        console.log(this.isHalal);
        return this.isHalal;
      });
  } */

  /* cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  } */
}
