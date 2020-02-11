import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CRUDService } from '../crud.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  movie;
  show;
  title = this.route.snapshot.params.title
  list = [];

  selectedMedia;
  constructor(
    private apiService: ApiService,
    private crudService: CRUDService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.search(this.title)
  }

  search(title){
    this.movie = this.apiService.searchMovieData(title).subscribe(data => {
      this.movie = data,
      this.list = this.movie.results
      console.log(this.list)
      
    })
    this.show = this.apiService.searchShowData(title).subscribe(data => {
      this.show = data,
      this.show.results.forEach(element => {
        this.list.push(element)
      });
      console.log(this.list)
      
    })
  }

  selectMovie(media): void {
    window.location.replace(`/display/movies${media.id}`);
  }

  selectShow(media): void {
    window.location.replace(`/display/shows${media.id}`);
  }

  addToList(media){
    this.fireAuth.auth.onAuthStateChanged((user) => {
      console.log(media)
      if(user){
        this.crudService.addToList(user,media,'Favorites');
      }
    }
  )}

}
