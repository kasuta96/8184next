// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import '@firebase/firestore'
import '@firebase/storage'
import firebaseConfig from '../firebase.config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Get a reference to the Cloud Firestore service
const db = firebase.firestore(app);

// Get a reference to the Storage service, which is used to create references in your storage bucket
const storage = firebase.storage(app);

export { firebase, db, storage };
