/*
This app can be used to add/revoke admin status to a user on the LLL firebase.
ex: yarn start [dev/staging] [up/down] [xxxUserIdxxx]
*/

var admin = require('firebase-admin');




if (!process.argv[2]) {
  throw Error("Example: yarn start [dev/staging] [up/down] [xxxUserIdxxx]");
}

var serviceAccountJsonPath;
var databaseURL;

switch (process.argv[2]) {
  case 'staging':
    serviceAccountJsonPath = "./LLLStaging-serviceAccountKey.secret.json";
    databaseURL = "https://leftylendinglibrary-staging.firebaseio.com";
    break;
  default: //dev
    serviceAccountJsonPath = "./LLL-serviceAccountKey.secret.json";//"../src/firebasesecrets/leftylendinglibrary-firebase-adminsdk-lm7m4-081a5b759c.json";//"firebasesecrets/leftylendinglibrary_firebaseConfig.json";
    databaseURL = "https://leftylendinglibrary-c85d7.firebaseio.com";//"https://leftylendinglibrary.firebaseio.com";
}

var serviceAccount = require(serviceAccountJsonPath);
// const serviceAccountFile = require(serviceAccountJsonPath);
// const serviceAccountContent = JSON.stringify(serviceAccountFile);
// var serviceAccountKey = serviceAccountContent.private_key;
// const config = {
//     apiKey: envConfig.googleKey,
//     authDomain: "leftylendinglibrary.firebaseapp.com",
//     databaseURL: "https://leftylendinglibrary.firebaseio.com",
//     projectId: "leftylendinglibrary",
//     storageBucket: "leftylendinglibrary.appspot.com",
//     messagingSenderId: "702897100741",
//     clientId: envConfig.googleOauthClientId,
//     scopes: [
//           'email',
//           'profile',
//           'https://www.googleapis.com/auth/drive.appdata', 
//           'https://www.googleapis.com/auth/drive.file'
//     ],
//     discoveryDocs: [
//       "https://sheets.googleapis.com/$discovery/rest?version=v4"
//     ]
//     // appId: "1:702897100741:web:56e2ea67d96f60cf1addac"
// }
admin.initializeApp(
  // config
  {
  // credential: admin.credential.cert(JSON.parse(serviceAccountContent)),
  credential: admin.credential.cert(serviceAccount),
  // //could be used if CRA would read GOOGLE_APPLICATION_CREDENTIALS, but nooooo:
  // credential: admin.credential.applicationDefault(),
  databaseURL: databaseURL
  }
);

if (!process.argv[3]) {
  throw Error("Example: yarn start [dev/staging] [up/down] [xxxUserIdxxx]");
}

let upgrade = process.argv[3] === "up";

if (!process.argv[4]) {
  throw Error("Example: yarn start [dev/staging] [up/down] [xxxUserIdxxx]");
}

let uid = process.argv[4];
// The new custom claims will propagate to the user's ID token the
// next time a new one is issued.
admin.auth()
// .setCustomUserClaims(uid, claims);
.setCustomUserClaims(uid, { admin: upgrade }).then(()=> {
}).catch(err=>console.log(err))
admin.auth().getUser(uid)
  .then(async(userResult) => {
     // Confirm the user is an Admin.
     if (!!userResult) {
       // Show admin UI.
       console.log('user');
       console.log(userResult);
       // if (!!userResult.customClaims.admin) {
       //   const userIdToken = await userResult.getIdToken({forceRefresh:true}).then(idToken=>console.log(idToken))
       //   console.log(userIdToken, userIdToken.claims)
       // }
     } else {
       // Show regular user UI.
       console.log('no user');
     }
  })
  .catch((error) => {
    console.log(error);
  });