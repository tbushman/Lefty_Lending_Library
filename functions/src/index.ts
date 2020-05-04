/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Sample trigger function that copies new Firebase data to a Google Sheet

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// const {OAuth2Client} = require('google-auth-library');
// const {google} = require('googleapis');
const { googleOAuth } = require('app');


// // visit the URL for this Function to request tokens
// exports.authgoogleapi = functions.https.onRequest((req: any, res: any) => {
//   res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
//   res.redirect(functionsOauthClient.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//     prompt: 'consent',
//   }));
// });
// 
// // setup for OauthCallback
// const DB_TOKEN_PATH = '/api_tokens';
// 
// // after you grant access, you will be redirected to the URL for this Function
// // this Function stores the tokens to your Firebase database
// exports.oauthcallback = functions.https.onRequest(async (req: any, res: any) => {
//   res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
//   const code = req.query.code;
//   try {
//     const {tokens} = await functionsOauthClient.getToken(code);
//     // Now tokens contains an access_token and an optional refresh_token. Save them.
//     await admin.database().ref(DB_TOKEN_PATH).set(tokens);
//     return res.status(200).send('App successfully configured with new Credentials. '
//         + 'You can now close this page.');
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

// // trigger function to write to Sheet when new data comes in on CONFIG_DATA_PATH
// exports.appendrecordtospreadsheet = functions.database.ref(`${CONFIG_DATA_PATH}/{ITEM}`).onCreate(
//     (snap: any) => {
//       const newRecord = snap.val();
//       return appendPromise({
//         spreadsheetId: CONFIG_SHEET_ID,
//         range: 'A:C',
//         valueInputOption: 'USER_ENTERED',
//         insertDataOption: 'INSERT_ROWS',
//         resource: {
//           values: [[newRecord.firstColumn, newRecord.secondColumn, newRecord.thirdColumn]],
//         },
//       });
//     });

// accepts an append request, returns a Promise to append it, enriching it with auth
// function appendPromise(requestWithoutAuth: any) {
//   return new Promise((resolve, reject) => {
//     return getAuthorizedClient().then((client) => {
//       const sheets = google.sheets('v4');
//       const request = requestWithoutAuth;
//       request.auth = client;
//       return sheets.spreadsheets.values.append(request, (err: any, response: any) => {
//         if (err) {
//           console.log(`The API returned an error: ${err}`);
//           reject(err);
//         }
//         resolve(response.data);
//       });
//     });
//   });
// }
// 
// // checks if oauthTokens have been loaded into memory, and if not, retrieves them
// async function getAuthorizedClient() {
//   if (oauthTokens) {
//     return functionsOauthClient;
//   }
//   const snapshot = await admin.database().ref(DB_TOKEN_PATH).once('value');
//   oauthTokens = snapshot.val();
//   functionsOauthClient.setCredentials(oauthTokens);
//   return functionsOauthClient;
// }

// // HTTPS function to write new data to CONFIG_DATA_PATH, for testing
// exports.testsheetwrite = functions.https.onRequest(async (req: any, res: any) => {
//   const random1 = Math.floor(Math.random() * 100);
//   const random2 = Math.floor(Math.random() * 100);
//   const random3 = Math.floor(Math.random() * 100);
//   const ID = new Date().getUTCMilliseconds();
//   await admin.database().ref(`${CONFIG_DATA_PATH}/${ID}`).set({
//     firstColumn: random1,
//     secondColumn: random2,
//     thirdColumn: random3,
//   });
//   res.send(`Wrote ${random1}, ${random2}, ${random3} to DB, trigger should now update Sheet.`);
// });


exports.googleOAuthCaller = functions.https.onRequest(googleOAuth)
// export functions.https.onRequest(app)



// // import { 
// // 	// firebase, 
// // 	// admin, 
// // 	functions, 
// // 	// auth 
// // } from '../../src/libs'; 
// import * as functions from 'firebase-functions'
// // import { authConfig } from '../../src/config';
// // import * as firebase from 'firebase/app';
// // import '@firebase/auth';
// // import '@firebase/firestore';
// // import '@firebase/functions';
// // import '@firebase/admin';
// // 
// // import * as functions from 'firebase-functions';
// import { 
//   google
//   // , sheets_v4 
// } from 'googleapis';
// 
// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// export const getGoogleSheet = functions.https.onCall(async (req: any, res: any) => {
// 	// const oauth2Client = await new google.auth.OAuth2(
// 	//   process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID,
// 	//   process.env.REACT_APP_GOOGLE_OAUTH_SECRET,
// 	//   process.env.REACT_APP_GOOGLE_CALLBACK_URL_DEV
// 	// );
// 	// google.options({
// 	//   auth: auth
// 	// })
// 	const sheets = await google.sheets({
// 	  version: 'v4'
// 	});
// 	console.log(sheets)
// 	await sheets.spreadsheets.values
// 	.get({
// 	  spreadsheetId: process.env.SPREADSHEET_ID,//authConfig.spreadsheetId,
// 	  range: "Books"
// 	})
// 	.then(async (result) => {
// 	  // let hr: string[] = [];
// 	  if (!!result) {
// 	    console.log(result)
// 	  }
// 	})
// 	.catch(err=>{
// 		console.log(err)
// 	});
// 
// })
// // // .onRequest((request, response) => {
// // 
// //  // response.send("Hello from Firebase!");
// // });