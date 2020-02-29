import { Component, OnInit } from '@angular/core';
import { movieGenres, tvGenres } from '../../assets/genre';
import { MovieDBService } from '../movie-db.service';
import { CRUDService } from '../crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { ApiService } from '../api.service';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {
  genres = tvGenres;
  popular;
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';
  names =[];
  genreName;
  genre;
  list =[];

  constructor(
    private movieService: MovieDBService,
    private crudService: CRUDService,
    private apiService: ApiService,
    private fireAuth: AngularFireAuth,

  ) { }

  ngOnInit() {
    this.getPopular();
    this.getGenres();
  }

  getPopular(){
    this.movieService.popularShows().subscribe(data => {
      this.popular = data;
      this.popular = this.popular.results
    })
  }

  getGenres(){
    var count = 0
    this.genres.forEach(element => {
      console.log(element);
      
      this.genreName = this.genres[count].name;
      this.names.push(this.genreName)
      
      console.log(`Counter: ${count}`)
      this.movieService.genreShow(this.genres[count].id).subscribe(data => {
        this.genre = data;
        this.genre = this.genre.results;
        console.log(count +'results = ' + this.genre.length)
        // if(this.genre.length < 20){
        //   console.log(count)
        //   console.log("Other Counter ^")
        //   this.movieService.Show2(this.genres[count].id).subscribe(other => {
        //     this.genre = other;
        //     this.genre = this.genre.results
        //   });
        //}
        this.list.push(this.genre)
        console.log(this.list)
      })
      count+=1
      
    });
  }

  selectShow(show){
    console.log(show)
    window.location.replace(`/display/tv/${show.id}`);
  }

  addToList(show){
    this.fireAuth.auth.onAuthStateChanged((user) => {
      console.log(show)
      if(user){
        this.crudService.addToList(user,show,'Favorites');
      }
    }
  )}


}
