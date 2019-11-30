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

  croppedImage = null;
  isLoading = false;

  @ViewChild(ImageCropperComponent)angularCropper: ImageCropperComponent

  public ingredient: Ingredient[];
  public loadedIngredientList: Ingredient[];
  public sourceType: number;

  public imageBase64: string;

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private camera: Camera,
    private loading: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private ingservice: IngredientService) { }

  ngOnInit() {
  }

  //Cropping image function
  // imageCropper(event: ImageCroppedEvent){
  //   this.croppedImage = event.base64
  // }

  saveCroppedImage(){
    this.imageBase64 = (this.angularCropper.crop() as ImageCroppedEvent).base64;
  }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.captureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
            // this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            // this.sourceType = this.camera.PictureSourceType.CAMERA;
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

  async startUpload() {

    this.saveCroppedImage();

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
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.image = 'data:image/png;base64,' + ImageData;
    });
  }

}
