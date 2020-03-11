import { Component, OnInit } from '@angular/core';
import { movieGenres } from '../../assets/genre';
import { MovieDBService } from '../movie-db.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { CRUDService } from '../crud.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  popularMovies;
  genres = movieGenres;
  genreName;
  names = [];
  genre;
  list = [];
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';

  constructor(
    private movieService: MovieDBService,
    private apiService: ApiService,
    private fireAuth: AngularFireAuth,
    private crudService: CRUDService,

  ) {
  }

  ngOnInit() {
    this.getPopularMovies();
    this.getGenre();
  }

  getPopularMovies(){
    this.movieService.popularMovie().subscribe(data => {
      this.popularMovies = data;
      this.popularMovies = this.popularMovies.results
    })
  }

  getGenre(){
    let count = 0
    this.genres.forEach(element => {
      
      // let rand = Math.floor(Math.random() * this.genres.length);
      
      this.genreName = this.genres[count].name;
      this.names.push(this.genreName)
      console.log(this.names)
      
      this.movieService.genreMovie(this.genres[count].id).subscribe(data => {
        this.genre = data;
        this.genre = this.genre.results;
        this.list.push(this.genre)
        console.log(this.list)
      })

    count += 1
    });
  }

  selectMovie(movie){
    window.location.replace(`/display/movie/${movie.id}`);
  }

  // addToList(media){
  //   this.fireAuth.auth.onAuthStateChanged(user => {
  //     if(user){
  //       this.crudService.addToList(user,media,'Favorites');
  //       console.log(`Added To list`)
  //     }
  //   }
  // )}
    
}
