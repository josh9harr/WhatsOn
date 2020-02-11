import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CRUDService } from 'src/app/crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Users } from '../../assets/Users.model';

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

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
  ) { }

   ngOnInit() {
     this.fireAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.SignedIn =true;

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

}
