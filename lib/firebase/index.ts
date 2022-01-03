import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCySjfK0G6EwXk6GKZ4sxDSBACjptZItmk',
  authDomain: 'memory-traning-calendar-chat.firebaseapp.com',
  projectId: 'memory-traning-calendar-chat',
  storageBucket: 'memory-traning-calendar-chat.appspot.com',
  messagingSenderId: '800903711875',
  appId: '1:800903711875:web:ce8b9ee2ef02f11b525fb6',
  measurementId: 'G-RMKP2YYZB1',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()

export { db, auth }
