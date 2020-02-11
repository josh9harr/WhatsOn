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
        window.location.replace('/home')
      }
    });
  }

  googleSignUp() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
  }

  facebookSignUp(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
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
