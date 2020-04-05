import * as functions from 'firebase-functions';
let serviceAccount = require('../environments/newKey.json');

// Firebase
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const env = functions.config();
// const algoliasearch = require('algoliasearch');
const vision = require('@google-cloud/vision');

// Cloud Vision
const visionClient = new vision.ImageAnnotatorClient();
// const client = algoliasearch(env.aslgolia.appid, env.algolia.apikey);
// const coll = client.initIndex('dev_Ingredients');

// Dedicated bucket for cloud function invocation
const bucketName = 'hikma-96b46-vision';

export const imageTagger = functions.storage

  .bucket(bucketName)
  .object()
  .onFinalize(async (object, _context) => {

    // const arrHalal: Array<string> = []
    const arrNonHalal: Array<string> = []

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
    let nonHalal: boolean = false;
    const textfound = results[0].textAnnotations.map((obj: { description: string }) => obj.description.toLowerCase().toString());
    const textArray = textfound[0].match(/([a-zA-Z0-9][\s]*)+/g);///(?:[^,.:(][^,.:(]+|\([^)]+\))+/g);
    const textDetected = trimArray(textArray);
    console.log(textDetected);

    for (const element of textDetected) {
      // console.log(textDetected[index]);
      await items.where('nonhalal', '==', element).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no match')
          }
          snapshot.forEach(doc => {
            console.log(doc.data());
            // console.log('matching document to ' + textDetected[index]);
            nonHalal = true;
            arrNonHalal.push(element)
          });
          console.log("before exit: arrhalal => " + arrNonHalal)
          return docRef.set({ nonHalal, arrNonHalal });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
    console.log("before set: nonHalal => " + nonHalal, "arrhalal => " + arrNonHalal)
  });

function trimArray(arr: Array<string>) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  return arr;
}

// exports.indexItems = functions.firestore
//   .document('Ingredients/{itemId}')
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     const objectId = snap.id;

//     //Add the data to the algolia index
//     return coll.addObject({
//       objectId,
//       ...data
//     })
//   });

  // exports.unindexItems = functions.firestore
  // .document('Ingredients/{itemId}')
  // .onDelete((snap, context) => {
  //   const objectId = snap.id;

  //   //Delete an Id from the algolia index
  //   return index.deleteObject({
  //     objectId
  //   })
  // });