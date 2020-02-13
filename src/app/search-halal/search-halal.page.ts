import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, AlertController } from '@ionic/angular';


import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators';

import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { Ingredient, IngredientService } from "../services/ingredient.service";

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-search-halal',
  templateUrl: './search-halal.page.html',
  styleUrls: ['./search-halal.page.scss'],
})
export class SearchHalalPage implements OnInit{
  
  showResults = false;

  // Upload task
  task: AngularFireUploadTask;

  // Firestore data
  result$: Observable<any>;
  
  //loading: Loading;
  image: string;

  public croppedImage = "";
  public isLoading = false;

  public ingredient: Ingredient[];
  public loadedIngredientList: Ingredient[];

  public searchTerm = '';
  public isHalal:boolean;
  // public showBody:boolean = false;
  public hideCropping: boolean;
  public sourceType: number;
  public message: string;

  public imageBase64: string;

  @ViewChild(ImageCropperComponent)angularCropper: ImageCropperComponent;
  
  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private camera: Camera,
    private loading: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController ,
    private ingservice: IngredientService
  ){

    // this.loading = this.loadingCtrl.create({
    //   content: 'Running AI vision analysis...'
    // });
  }

  ngOnInit(){
    this.ingservice.getIngredients()
      .subscribe(ingredients =>{
        this.ingredient = ingredients;
        this.loadedIngredientList = ingredients;
      });
  }

  //For Try 3
  initializeItems() {
    this.ingredient = this.loadedIngredientList
  }

  getList(){
    this.initializeItems();

    console.log(this.ingredient.length)

    for (let index = 0; index < this.ingredient.length; index++) {

      if (this.searchTerm.toLowerCase() == this.ingredient[index].nonhalal.toLowerCase()){
        console.log('+++++++++++++++++++++++++++++++++++++++')
        this.isHalal = false;
        // console.log(this.ingredient[index].nonhalal)
        // this.showBody = true;
        this.presentAlert("It Isn't Halal", this.searchTerm, this.ingredient[index].notes)
        break;
      }
      else{
        // console.log('__________________________________________________________________')
        this.isHalal = true;
        //  console.log(this.ingredient[index])
        // this.showBody = true;
        this.message = "It Is Halal"
      }
    };
    if(this.isHalal == true){
      this.presentAlert(this.message, this.searchTerm, 'None')
    }
  }

  saveCroppedImage(){
    this.imageBase64 = (this.angularCropper.crop() as ImageCroppedEvent).base64;
  }

  cancelCropping(){
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
      correctOrientation: true
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.image = 'data:image/png;base64,' + ImageData;
    });
  }

  async presentAlert(msg: string, item:string, notes: string) {
    const alert = await this.alertController.create({
      header: 'Is ' + item + ' Halal?',
      message: msg + '<br>Additional notes: ' + notes,
      buttons: ['OK'],
    });

    await alert.present();
  }

}