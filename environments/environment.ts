// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyA66Zh6TtzvsfrnMcWvbwaf7lFUh6z3mxg",
      authDomain: "halalify-1563323333384.firebaseapp.com",
      databaseURL: "https://vision-ff40d.firebaseio.com/",
      projectId: "halalify-1563323333384",
      storageBucket: "gs://hikma-96b46-vision",
      messagingSenderId: "576518555827",
      appId: "1:576518555827:web:22a4c23331e55e24",
      measurementId: "G-7BB837GBNV"
    },

    algolia: {
      appid: "ASO4732AZO",
      apikey: "7451fa5e14a69b333481605b7fb77144"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
