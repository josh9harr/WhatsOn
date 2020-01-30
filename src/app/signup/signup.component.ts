import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/crud.service'
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router"

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
        this.router.navigate(['/profile'])
      }
    });
  }

  createUser(fname,lname,email,password){
    const userData = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    }
    this.CRUD.signUp(email, password, userData);
    this.router.navigate(['/profile'])
  }

}
