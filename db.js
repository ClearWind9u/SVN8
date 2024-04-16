// // // import { initializeApp } from "firebase/app";

// // const { initializeApp } = require("firebase-admin/app");
// // const config = require("./config");

// // const db = firebase.initializeApp(config.firebaseConfig);

// // module.exports = db;


// const { initializeApp, cert } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const serviceAccount = require("./creds.json");

// initializeApp({
//   credential: cert(serviceAccount),
// });

// const db = getFirestore();
// // const db = firebase.initializeApp(config.firebaseConfig);


// module.exports = { db };

// import firebase from "firebase/app";
// const firestore = require("firebase/firestore");



const admin = require("firebase-admin");
const serviceAccount = require("./creds.json");

const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = db;