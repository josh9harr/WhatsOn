import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service'
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.replace('/profile')
      }
    });
  }

  createUser(fname,lname,email,password){
    const userData = {
      fname: fname,
      lname: lname,
      displayName: `${fname} ${lname}`,
      email: email,
      password: password,
    }
    this.CRUD.signUp(email, password, userData);
    // window.location.replace('/profile')
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
}