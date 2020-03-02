import { Component } from '@angular/core';
import { CRUDService } from './crud.service'
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "What's On?";
  Signedin;



  constructor(private CRUDService: CRUDService, private fireAuth: AngularFireAuth) {
    let user = this.fireAuth.auth.currentUser;
      if (user != null) {
        this.Signedin = true;
      }else{
        this.Signedin = false;
      }
    
  }

  async check(){
    await this.fireAuth.auth.currentUser
  }


}
