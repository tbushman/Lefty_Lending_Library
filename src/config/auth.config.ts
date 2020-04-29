import dotenv from 'dotenv';
import envConfig from './env.config';
import * as path from 'path';
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
let buildType = envConfig.reactAppBuildEnv; //TODO: Find a way to set this accordingly

let config = {};
console.log(`Build type: ${buildType}`);
if (buildType === "production") {
    throw new Error('No production auth config setup!');
}
else if(buildType === "staging"){
    config = {
        apiKey: "AIzaSyDqv2ZTLI6GedIqIXfgjHtdAY7AzZ_Rt-o",
        authDomain: "leftylendinglibrary-staging.firebaseapp.com",
        databaseURL: "https://leftylendinglibrary-staging.firebaseio.com",
        projectId: "leftylendinglibrary-staging",
        storageBucket: "leftylendinglibrary-staging.appspot.com",
        messagingSenderId: "846787073683"
    }
}
//Dev
else {
    config = {
        apiKey: "AIzaSyAwA1MMLiWA19hmOwNOyAtmG2lW_Uuh3gc",
        authDomain: "leftylendinglibrary-c85d7.firebaseapp.com",
        databaseURL: "https://leftylendinglibrary-c85d7.firebaseio.com",
        projectId: "leftylendinglibrary-c85d7",
        storageBucket: "leftylendinglibrary-c85d7.appspot.com",
        messagingSenderId: "977740674552"
        // apiKey: envConfig.googleKey,
        // authDomain: "leftylendinglibrary.firebaseapp.com",
        // databaseURL: "https://leftylendinglibrary.firebaseio.com",
        // projectId: "leftylendinglibrary",
        // storageBucket: "leftylendinglibrary.appspot.com",
        // messagingSenderId: "702897100741",
        // appId: "1:702897100741:web:56e2ea67d96f60cf1addac"
    }
    // console.log(config)
    
}

export const authConfig = config;