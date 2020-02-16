import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
// import * as algoliasearch from 'algoliasearch'

admin.initializeApp();

// const env = functions.config();
// const algoliasearch = require('algoliasearch');
const vision = require('@google-cloud/vision');

// Cloud Vision
const visionClient = new vision.ImageAnnotatorClient();
// const client = algoliasearch(env.algolia.appid, env.algolia.apikey, env.algolia.indexname);
//const coll = client.initIndex('dev_Items');


// Dedicated bucket for cloud function invocation
const bucketName = 'hikma-96b46-image-search';

export const imageTagger = functions.storage

  .bucket(bucketName)
  .object()
  .onFinalize(async (object, _context) => {

    // File data
    const filePath = object.name || '';

    // Location of saved file in bucket
    const imageUri = `gs://${bucketName}/${filePath}`;

    const docId = filePath.split('.jpg')[0];

    const docRef = admin.firestore().collection('halalCheck').doc(docId);
    const items = admin.firestore().collection('Ingredients');
    //let query; 

    // Await the cloud vision response
    const results = await visionClient.textDetection(imageUri);

    // Map the data to desired format
    //var nonHalal: boolean;
    const textfound = results[0].textAnnotations.map((obj: { description: string }) => obj.description.toLowerCase().toString());
    const textArray = textfound[0].match(/(?:[^,.:(][^,.:(]+|\([^)]+\))+/g);
    const textDetected = trimArray(textArray);

    for (let index = 0; index < textDetected.length; index++) {
      console.log(textDetected[index]);
      let nonHalal: boolean;
      //let list: Array<any> = [];
      items.where('nonhalal', '==', textDetected[index]).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no match');
            nonHalal = false;
            return docRef.set({ nonHalal, textDetected });
          }
          snapshot.forEach(doc => {
            console.log(doc.data());
            // list.push(doc.data);
            // console.log('array: ', list)
            nonHalal = true;
            return docRef.set({ nonHalal, textDetected });
          });
          return docRef.set({ nonHalal, textDetected });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
    // query.then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    //const hotdog = textDetected.includes(query);

    //return docRef.set({ textDetected });
  });
function trimArray(arr: Array<string>) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  return arr;
}

/* exports.indexItems = functions.firestore
  .document('Ingredients/{itemId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;

    //Add the data to the algolia index
    return coll.addObject({
      objectId,
      ...data
    })
  });

  exports.unindexItems = functions.firestore
  .document('Ingredients/{itemId}')
  .onDelete((snap, context) => {
    const objectId = snap.id;

    //Delete an Id from the algolia index
    return coll.deleteObject({
      objectId
    })
  }); */

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
