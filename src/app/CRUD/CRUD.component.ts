import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../crud.service';
import { Users } from 'src/assets/Users.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-CRUD',
  templateUrl: './CRUD.component.html',
  styleUrls: ['./CRUD.component.scss']
})
export class CRUDComponent implements OnInit {
  users: Users[];
  name = new FormControl('james');
  email = new FormControl('007@gmail.com');
  pass = new FormControl('bond');
  public newUser: Users;
  constructor(private CRUDService: CRUDService) { 
    
  }

  ngOnInit() {
    this.CRUDService.getUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Users
      })
      console.log(data)
    });
  }


    create(user: Users){
      this.newUser = new Users;
      this.newUser.email = this.email.value;
      this.newUser.name = this.name.value;
      this.newUser.password = this.pass.value;
      console.log('something should be happening')
      this.CRUDService.createUser(user);
    }

    update(user: Users){
      this.CRUDService.updateUser(user)
    }

    delete(id: string){
      this.CRUDService.deleteUser(id)
    }



}
