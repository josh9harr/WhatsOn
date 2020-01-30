import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CRUDService } from 'src/app/Crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Users } from '../../assets/Users.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [Users]
})
export class ProfileComponent implements OnInit {

  uid: string

  constructor(
    private router: Router,
    private CRUD: CRUDService,
    private fireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.uid = user.uid;
      }else{
        this.router.navigate(['/signin'])
      }
    })
  }

  signout(){
    this.CRUD.signOut();
  }

}
