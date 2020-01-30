import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service'
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if(user){
        this.router.navigate(['/home'])
      }
    });
  }

  googleSignUp() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
  }

  facebookSignUp(){
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });



  }


  async signIn(email, password) {
    await this.CRUD.signIn(email,password)
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/profile'])
      } else {
        console.log("Not Loggin In")
      }
    })
  }

}
