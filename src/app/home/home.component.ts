import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { MovieDBService } from '../movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies;
  shows;
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';
  constructor(
    private movieService: MovieDBService,

  ) { }

  ngOnInit() {
    this.topRatedMovies();
    this.topRatedShows()
  }

  topRatedMovies(){
    this.movieService.topRatedMovie().subscribe(data => {
      this.movies = data;
      this.movies = this.movies.results;
    })
  }

  topRatedShows(){
    this.movieService.topRatedShow().subscribe(data =>{
      this.shows = data;
      this.shows = this.shows.results;
    })
  }

  selectMedia(media, num){
    if(num ==0){
      window.location.replace(`/display/movie/${media.id}`)
    }
    if(num ==1){
      window.location.replace(`/display/tv/${media.id}`)
    }
  }

}