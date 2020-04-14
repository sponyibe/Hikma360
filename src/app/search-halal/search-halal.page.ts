import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { Ingredient, IngredientService, imageTagger } from "../services/ingredient.service";
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-search-halal',
  templateUrl: './search-halal.page.html',
  styleUrls: ['./search-halal.page.scss'],
})
export class SearchHalalPage {

  public showResults = false;

  // Upload task
  public task: AngularFireUploadTask;

  // Firestore data
  public result$: Observable<imageTagger>;
  public photoRef: AngularFireObject<imageTagger>

  //loading: Loading;
  public image: string;
  public pls: imageTagger

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

  private subscription: Subscription;
  public imageBase64: string;
  public brokenDownSearch;
  public client: any;
  public index: any;

  @ViewChild(ImageCropperComponent) angularCropper: ImageCropperComponent;

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private ingservice: IngredientService,
  ) {
    this.isLoading = this.loadingCtrl.create({ message: 'loading...' })
  }

  ionViewWillEnter() {
    this.subscription = this.ingservice.getIngredients()
      .subscribe(ingredients => {
        this.ingredient = ingredients;
        this.loadedIngredientList = ingredients;
      });
  }

  newSearch() {

    this.index.search({
      query: this.searchTerm,
      attributesToRetrieve: ['nonhalal', 'notes']
    }).
      then((data: any) => {
        console.log(data.hits)
        if (data.hits.length) {
          if(data.hits[0].nonhalal.toLowerCase() != this.searchTerm.toLowerCase()){
            console.log(data.hits[0].nonhalal)
            console.log("algolia")
            this.presentAlert('If you meant ' + data.hits[0].nonhalal + ', it is not Halal', this.searchTerm, data.hits[0].notes)
          }else{
            console.log("algolia else")
          this.presentAlert("This isn't Halal", this.searchTerm, data.hits[0].notes)
          }
        }
        else if (!this.getList()) {
          console.log("firestore")
          this.presentAlert("This isn't Halal", this.searchTerm, 'None')
        }
        else {
          console.log("firestore else")
          this.presentAlert('This is Halal', this.searchTerm, 'None')
        }
      });
  }

  //For Try 3
  initializeItems() {
    this.ingredient = this.loadedIngredientList
    // console.log(JSON.stringify(this.ingredient))
  }

  getList() {
    this.initializeItems();

    this.brokenDownSearch = this.searchTerm.split(' ')

    if (this.brokenDownSearch.length > 1) {
      this.brokenDownSearch.push(this.searchTerm);
    }

    console.log(this.brokenDownSearch);

    // Loop through the individual search terms
    for (let i = 0; i < this.brokenDownSearch.length; i++) {

      // Loop through the database
      for (let index = 0; index < this.ingredient.length; index++) {
        this.ingredient[index].nonhalal.toLowerCase()

        // The item is in the DB so it's false
        if (this.brokenDownSearch[i].toLowerCase() == this.ingredient[index].nonhalal.toLowerCase()) {
          this.isHalal = false;
          break;
        }
        // The item is not in the DB so it's true
        else {
          this.isHalal = true;
        }
      }
      // Once one of the search terms have been found break.
      if (this.isHalal === false) {
        break;
      }
    }

    if(!this.isHalal){
      return false;
    }
    else{
      return true;
    }
  }

  saveCroppedImage() {
    this.imageBase64 = (this.angularCropper.crop() as ImageCroppedEvent).base64;
  }

  cancelCropping() {
    this.hideCropping = !this.hideCropping;
  }

  async selectSource() {
    try {
      let actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Use Library',
            handler: () => {
              this.captureAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY);
              this.hideCropping = true;
            }
          }, {
            text: 'Capture Image',
            handler: () => {
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
    } catch (e) {
      console.log(e)
    }
  }

  async startUpload() {

    this.saveCroppedImage();

    // this.hideCropping = false;

    // Show loader
    this.showLoader();

    // const timestamp = new Date().getTime().toString();
    const docId = this.afd.createPushId();

    const path = `${docId}.jpg`;

    // Make a reference to the future location of the firestore document
    // const photoRef = this.afs.collection('halalCheck').doc(docId)
    this.photoRef = this.afd.object(docId)

    // Firestore observable, dismiss loader when data is available
    this.result$ = this.photoRef.valueChanges().pipe(
      filter(data => !!data),
      tap(_ => this.loadingCtrl.dismiss())
    );

    this.result$.subscribe(data => console.log(data))

    // this.photoRef.snapshotChanges().subscribe(tell => {
    //   this.pls = tell.payload.val()
    //   console.log('test')
    //   if(this.pls.arrNonHalal){
    //     console.log(this.pls)
    //   }
    // })

    // The main task
    this.task = this.storage.ref(path).putString(this.imageBase64, 'data_url');
  }

  // Gets the pic from the native camera then starts the upload
  captureAndUpload(sourceType: PictureSourceType) {
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
    }, (err) => {
      console.log(err)
    })
  }

  async presentAlert(msg: string, item: string, notes: string) {
    const alert = await this.alertController.create({
      header: 'Is ' + item + ' Halal?',
      message: msg + '<br><strong> Additional notes</strong>: ' + notes,
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

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}