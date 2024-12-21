import { Injectable } from '@angular/core';

// import 'firebase/compat/firestore';
import { User } from './user'; // Import the User interface
import { Project } from './project';
import { map } from 'rxjs/operators';
// to update the firestore
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, doc, updateDoc, arrayUnion, FieldValue, getDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  // app = initializeApp(environment.firebaseConfig)
  // db = getFirestore(this.app)

  // constructor(private afAuth: AngularFireAuth) { }

  // async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return this.afAuth.signInWithEmailAndPassword(email, password);
  // }

  // async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password);
  // }

  // async logout(): Promise<void> {
  //   return this.afAuth.signOut();
  // }

  // getAuthState() {
  //   return this.afAuth.authState;
  // }
}
