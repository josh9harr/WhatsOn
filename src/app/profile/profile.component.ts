import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CRUDService } from 'src/app/crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Users } from '../../assets/Users.model';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [Users],
})
export class ProfileComponent implements OnInit {
  users;
  SignedIn = false;
  uid: string;
  current;
  google = false;
  edit = false;
  facebook=false;
  linkedG;
  linkedF;
  email;
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';
  myList;
  facebookProvider = new firebase.auth.FacebookAuthProvider();
  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,

  ) {}

   ngOnInit() {
     this.fireAuth.auth.onAuthStateChanged((user) => {
       
       if(user != null) {
         this.SignedIn =true;
         this.current = user;
         
         this.CRUD.getUser(user.uid).subscribe(data => {
           const info = data.data();
           let userData = new Users;
           userData.fname = info.fname;
           userData.lname = info.lname;
           userData.displayName = info.displayName;
           userData.email = info.email;
           userData.password = info.password;
           this.current = userData;
          })
          this.getList();
          this.getUserData();
        }else{
          this.SignedIn = false;
        }
      })
  }

  getUserData(){
    let user = firebase.auth().currentUser;

    if (user != null) {
      this.linkedG = false;
      this.linkedF = false;
      user.providerData.forEach(profile => {
        console.log(profile);
        if(profile.providerId == "google.com"){
          this.linkedG=true;
        }
        if(profile.providerId == "facebook.com"){
          this.linkedF=true;
        }
      });
    }
  }

  signout(){
    this.CRUD.signOut();
    window.location.replace('/home');
  }

  editUser(){
    this.edit = true;
    var pop = document.getElementsByClassName('modal')[0]
    //.getElementById('myModal');
    pop[0].style.display = 'block';
    this.CRUD.signOut()

  }

  saveEdit(name, email, password){
    let user = firebase.auth().currentUser;
    console.log(user);

    user.updateProfile({
      displayName: name
    }).then(() => {
      console.log('updated profile')
    }).catch(error => {
      console.log(error)
    })

    this.changeEmail(email);
    this.changePassword(password);

    let newData = {displayName: name}

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
    firebase.auth().currentUser.linkWithPopup(this.googleProvider).then(result => {
      this.google = true
      window.location.reload();
    }).catch(err => {
      console.log(err)
    })
  }

  unlink(provider){
    let user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(profile => {
        if(profile.providerId == provider){
          user.unlink(profile.providerId).then(() => {
            // alert("You have unlinked your account from " + provider);
            window.location.reload();
          }).catch(error => {
            console.log(error)
          });
        }
      });
    }
  }

  linkFacebook(){
    firebase.auth().currentUser.linkWithPopup(this.facebookProvider).then(result => {
      this.facebook=true
      window.location.reload();
    }).catch(err => {
      console.log(err)
    })
  }

  selectMedia(media){
    window.location.replace(`/display/${media.type}/${media.id}`);    
  }

  getList(){
    let current = firebase.auth().currentUser
    this.CRUD.readList(current.uid, 'Favorites').subscribe(data => {
      this.myList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      // this.myList = this.myList.reverse();
      console.log(this.myList)
    })
  }

}