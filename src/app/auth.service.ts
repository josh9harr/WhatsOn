import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';
// import { User } from '../user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.id}`).valueChanges();
        } else{
          return of(null);
        }
      })
    )
  }


  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const cred = await this.afAuth.auth.signInWithPopup(provider)
    return this.updateUserData(cred.user);
  }

  async singOut() {
    this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);

    const data = {
      name: user.name,
      email: user.email,
      password: user.password
    };

    return userRef.set(data, {merge: true });  
  }


}
