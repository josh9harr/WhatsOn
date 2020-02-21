import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CRUDService } from 'src/app/crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Users } from '../../assets/Users.model';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [Users],
})
export class ProfileComponent implements OnInit {
  users;
  SignedIn;
  uid: string;
  current;
  edit = false;
  email;
  google=false;
  facebook =false;
  facebookProvider = new firebase.auth.FacebookAuthProvider();
  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,

  ) { }

   ngOnInit() {
     console.log(firebase.auth().currentUser)
     this.fireAuth.auth.onAuthStateChanged((user) => {
       console.log(user)
      if(user) {
        this.SignedIn =true;
        this.current = user;

        document.getElementById('name').innerText = user.displayName;
        document.getElementById('email').innerText = user.email;

        this.CRUD.getUser(user.uid).subscribe(data => {
          const info = data.data();
          let userData = new Users;
          userData.fname = info.fname;
          userData.lname = info.lname;
          userData.email = info.email;
          userData.password = info.password;
          this.current = userData;
        })
      }else{
        this.SignedIn = false;
      }
    })
  }

  signout(){
    this.CRUD.signOut();
    window.location.replace('/home');
  }

  editUser(){
    this.edit = true;
    this.CRUD.signOut()
  }

  saveEdit(fname, lname){
    let user = firebase.auth().currentUser;
    console.log(user);

    user.updateProfile({
      displayName: `${fname} ${lname}`
    }).then(() => {
      console.log('updated profile')
    }).catch(error => {
      console.log(error)
    })

    let newData = {fname: fname, lname: lname}

    this.firestore.doc(`users/${user.uid}`).update(newData)

    this.edit=false;
    location.reload();
  }

  changeEmail(email){
    let user = firebase.auth().currentUser;

    user.updateEmail(email).then( () => {
      console.log(user)
    }).catch(err => {
      console.log(err)
    })

  }

  changePassword(password){
    let user = firebase.auth().currentUser;

    user.updatePassword(password).then(()=>{
      console.log(user);
    }).catch(err => {
      console.log(err)
    })

  }

  linkGoogle(){
    console.log('Linking Google')
    firebase.auth().currentUser.linkWithPopup(this.googleProvider).then(result => {
      this.google = true
      console.log(result.credential)
      console.log(result.user)
      
    }).catch(err => {
      console.log(err)
    })
  }

  linkFacebook(){
    console.log('Linking facebook')
    firebase.auth().currentUser.linkWithPopup(this.facebookProvider).then(result => {
      this.facebook=true
      console.log(result.credential)
      console.log(result.user)
    }).catch(err => {
      console.log(err)
    })
  }
}
