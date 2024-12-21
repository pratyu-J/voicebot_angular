import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAdl3Hiw3_gLXgwpbA_PBeYmOspVDw63GM",
  authDomain: "authdb-8d729.firebaseapp.com",
  projectId: "authdb-8d729",
  storageBucket: "authdb-8d729.appspot.com",
  messagingSenderId: "1077972987059",
  appId: "1:1077972987059:web:a77f938929e9c33c3194c6",
  measurementId: "G-QF9VFBP2GH"
};

initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
