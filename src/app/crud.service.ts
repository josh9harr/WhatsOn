import { Injectable } from '@angular/core';
//Needed dependacies in order to create the CRUD service
//This import will create the instance of firebase
import { AngularFirestore } from '@angular/fire/firestore';
//Model for the database
import { Users } from '../assets/Users.model'
@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private firestore: AngularFirestore) { }

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






}
