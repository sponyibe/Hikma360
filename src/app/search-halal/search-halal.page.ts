import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, AlertController} from '@ionic/angular';


import { Observable } from 'rxjs'
import { tap, filter, map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { Ingredient, IngredientService } from "../services/ingredient.service";

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-search-halal',
  templateUrl: './search-halal.page.html',
  styleUrls: ['./search-halal.page.scss'],
})
export class SearchHalalPage {

  showResults = false;

  // Upload task
  task: AngularFireUploadTask;

  // Firestore data
  result$;

  //loading: Loading;
  image: string;

  public croppedImage = "";
  public isLoading;

  public ingredient: Ingredient[];
  public loadedIngredientList: Ingredient[];

  public searchTerm = '';
  public isHalal: boolean;
  // public showBody:boolean = false;
  public hideCropping: boolean;
  public sourceType: number;
  public message: string;

  public imageBase64: string;
  public brokenDownSearch

  @ViewChild(ImageCropperComponent) angularCropper: ImageCropperComponent;

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private ingservice: IngredientService
  ) {

    this.isLoading = this.loadingCtrl.create({ message: 'loading...' })

  }

  ionViewWillEnter(){
    this.ingservice.getIngredients()
      .subscribe(ingredients => {
        this.ingredient = ingredients;
        this.loadedIngredientList = ingredients;
      });
  }

  //For Try 3
  initializeItems() {
    this.ingredient = this.loadedIngredientList
  }

  getList() {
    this.initializeItems();

    this.brokenDownSearch = this.searchTerm.split(" ");

    if (this.brokenDownSearch.length > 1) {
      this.brokenDownSearch.push(this.searchTerm);
    }

    console.log(this.brokenDownSearch);

    for (let i = 0; i < this.brokenDownSearch.length; i++) {

      for (let index = 0; index < this.ingredient.length; index++) {
        this.ingredient[index].nonhalal.toLowerCase()

        if (this.brokenDownSearch[i].toLowerCase() == this.ingredient[index].nonhalal.toLowerCase()) {
          this.isHalal = false;
          break;
        }
        else {         
          this.isHalal = true;
        }
      }
      if (this.isHalal == false) {
        break;
      }
    }

    if(this.isHalal == true){
      this.presentAlert('This is Halal', this.searchTerm)
    }
    if(this.isHalal == false){
      this.presentAlert("This isn't Halal", this.searchTerm)
    }
  }

  saveCroppedImage() {
    this.imageBase64 = (this.angularCropper.crop() as ImageCroppedEvent).base64;
  }

  cancelCropping() {
    this.hideCropping = !this.hideCropping;
  }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
            // this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
            this.hideCropping = true;
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            // this.sourceType = this.camera.PictureSourceType.CAMERA;
            this.captureAndUpload(this.camera.PictureSourceType.CAMERA);
            this.hideCropping = true;
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async startUpload() {

    this.saveCroppedImage();

    // this.hideCropping = false;

    // Show loader
    this.showLoader();

    // const timestamp = new Date().getTime().toString();
    const docId = this.afs.createId();
    console.log(docId)

    const path = `${docId}.jpg`;

    // Make a reference to the future location of the firestore document
    const photoRef = this.afs.collection('halalCheck').doc(docId)

    // Firestore observable, dismiss loader when data is available
    photoRef.valueChanges().subscribe( data => {
       this.result$ = data
       console.log(this.result$)
       if(this.result$){
         this.hideLoader()
       }
     })

    // The main task
    // this.image = 'data:image/jpg;base64,' + this.imageBase64;
    this.task = this.storage.ref(path).putString(this.imageBase64, 'data_url');
  }

  // Gets the pic from the native camera then starts the upload
  async captureAndUpload(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.image = 'data:image/png;base64,' + ImageData;
    });
  }

  async presentAlert(msg: string, item: string) {
    const alert = await this.alertController.create({
      header: 'Is ' + item + ' Halal?',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  showLoader() {
    this.isLoading = this.loadingCtrl.create({
      message: 'Analyzing List...',
      spinner: 'dots'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    // this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 4000);
  }
}