import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MovieDBService } from '../movie-db.service';
import { CRUDService } from '../crud.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  movie;
  title = this.route.snapshot.params.title
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';
  list;
  results;

  selectedMedia;
  constructor(
    private apiService: ApiService,
    private crudService: CRUDService,
    private movieDBService: MovieDBService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.search(this.title)
  }

  search(title){

    this.movieDBService.search(title).subscribe(data => {
      this.movie = data,
      this.list = this.movie.results
      console.log(this.list)
    })

  }

  selectMedia(media) {
    window.location.replace(`/display/${media.media_type}/${media.id}`);[]
    
    // this.apiService.getMovieFromMovieDB(media.media_type,media.id).subscribe(stuff => {
    //   this.results = stuff

    // });
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
