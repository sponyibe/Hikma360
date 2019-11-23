import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';


import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Ingredient, IngredientService } from "../services/ingredient.service";
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.page.html',
  styleUrls: ['./image-search.page.scss'],
})
export class ImageSearchPage implements OnInit {

  showResults = false;

  // Upload task
  task: AngularFireUploadTask;

  // Firestore data
  result$: Observable<any>;
  
  //loading: Loading;
  image: string;
  originalImage

  croppedImage = null;
  isLoading = false;

  @ViewChild(ImageCropperComponent)angularCropper: ImageCropperComponent

  public ingredient: Ingredient[];
  public loadedIngredientList: Ingredient[];

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private camera: Camera,
    private loading: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private ingservice: IngredientService) { }

  ngOnInit() {
  }

  //Cropping image function
  imageCropper(event: ImageCroppedEvent){
    this.croppedImage = event.base64
    // this.startUpload(this.croppedImage)
    console.log(this.croppedImage)
  }

  // save(){
  //   this.croppedImage = this.angularCropper.crop();
  // }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
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
    const photoRef = this.afs.collection('photos').doc(docId)

    // Firestore observable, dismiss loader when data is available
    this.result$ = photoRef.valueChanges()
      .pipe(
        filter(data => !!data),
        tap()
      );


    // The main task
    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(path).putString(this.image, 'data_url');
  }

  // Gets the pic from the native camera then starts the upload
  async captureAndUpload(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    }

    // const base64 = await this.camera.getPicture(options)
    // this.startUpload(base64);

    this.camera.getPicture(options).then((ImageData) => {
      this.image = 'data:image/jpeg;base64,' + ImageData;
    });
  }

}
