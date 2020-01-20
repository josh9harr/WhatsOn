import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../crud.service';
import { Users } from 'src/assets/Users.model';
// import { from } from 'rxjs';
// import { create } from 'domain';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  users: Users[];


  constructor(private CRUDService: CRUDService) { }

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
      this.CRUDService.createUser(user);
    }

    update(user: Users){
      this.CRUDService.updateUser(user)
    }

    delete(id: string){
      this.CRUDService.deleteUser(id)
    }



}
