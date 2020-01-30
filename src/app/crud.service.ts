import { Injectable } from '@angular/core';
//Needed dependacies in order to create the CRUD service
//This import will create the instance of firebase
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app"
import { AngularFireAuth } from "@angular/fire/auth";
//Model for the database
import { Users } from '../assets/Users.model'
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';




@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    ) { }

  //gets users from database
  getUser() {
    return this.firestore.collection('users').snapshotChanges();
  }

  //Creates a user for the database
  createUser(user: Users) {
    return this.firestore.collection('users').add(user)
  }

  //updates user information
  // updateUser(user: Users){
  //   this.firestore.doc('users/'+user.id).update(user);
  // }

  //Deletes a user
  deleteUser(userId: string){
    this.firestore.doc('users/'+ userId).delete();
  }

  async signUp(email: string, password: string, userData) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      console.log(error)
    }).then(_ => {
      const user = firebase.auth().currentUser;
      if(user!=null) {
        let data = JSON.parse(JSON.stringify(userData));
        this.firestore.collection('users').doc(user.uid).set(data)
    }
    });
  }

  async signIn(email: string, password: string){
    try{
      await this.auth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () =>{
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then( () => {}).catch(function (error) {
          console.log('Incorrect Email or Password.')
        })
      });
    } catch (error) {
      console.log(error)
    }

  }

  signOut() {
    return firebase.auth().signOut();
  }

  async checkUser() {
    await firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if(user){
        return user.uid;
      }
    })
  }






}
