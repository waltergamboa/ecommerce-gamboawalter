// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUyCE8ZvbQ6U38zTNRIuYH5uLSX8qsuhM",
  authDomain: "ecommerce-gamboawalter-f4c68.firebaseapp.com",
  projectId: "ecommerce-gamboawalter-f4c68",
  storageBucket: "ecommerce-gamboawalter-f4c68.appspot.com",
  messagingSenderId: "568195551793",
  appId: "1:568195551793:web:98028df2690ad59fa73b10"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreApp = ()=>{
    return app;
}