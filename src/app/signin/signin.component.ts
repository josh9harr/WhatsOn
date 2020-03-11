import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service'
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  SignedIn;
  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if(user){
        this.SignedIn==true
      }
    });
  }

  googleSignUp() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(()=> {
        // this.CRUD.addUser()
      })
      this.fireAuth.auth.onAuthStateChanged((user) => {
        if(user!=null) {
          let userData = {
            displayName: user.displayName,
            email: user.email,
          }
          let data = JSON.parse(JSON.stringify(userData));
          this.firestore.collection('users').doc(user.uid).set(data);
        // this.firestore.collection('users').doc(user.uid).collection('SignIns').doc('facebook').set(user);          
          this.firestore.collection('users').doc(user.uid).collection('SignIns').doc('Google').set(true);
        }
      })
  }

  facebookSignUp(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var credential = error.credential;
      console.log(error)
      // if (error.code === 'auth/account-exists-with-different-credential') {
      //   var email = error.email;
      //   var pendCred = error.credential;
      //   firebase.auth().fetchSignInMethodsForEmail(email).then(methods => {
      //     if(methods[0]==='password'){
      //       //get User pasword
      //          var password;
      //       //   firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
      //       //     window.location.replace('/profile')
      //       // })
      //       this.signIn(email,password);
      //     }
      //   })
      // }
    });



  }


  async signIn(email, password) {
    await this.CRUD.signIn(email,password)
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.replace('/profile')
      } else {
        console.log("Not Loggin In")
      }
    })
  }

}
