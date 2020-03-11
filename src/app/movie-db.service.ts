import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieDBService {

  constructor(private http: HttpClient) { }
  start = 'https://api.themoviedb.org/3/';
  key = '?api_key=4233fc015e489c82cdd57b991d85d07b';

  searchShow(title){
    let data = this.http.get(
      `${this.start}search/tv${this.key}&query=${title}&include_adult=false`
      );
      return data;
  }

  searchMovie(title){
    let data = this.http.get(
      `${this.start}search/movie${this.key}&query=${title}&include_adult=false`
      );
      return data;
  }

  search(title){
    let data = this.http.get(
      `${this.start}search/multi${this.key}&query=${title}&include_adult=false`
      );
      return data;
  }

  displayMedia(type,id){

    let data = this.http.get(
      `${this.start}${type}/${id}${this.key}`
    );
    return data;
  }

  getCast(type, id){
    let data = this.http.get(
      `${this.start}${type}/${id}/credits${this.key}`
    );
    return data;
  
  }

  popularMovie(){
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  )
  return data
  }

  genreMovie(genreId, page = 1) {
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/movie${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=5&with_genres=${genreId}`
    );
    return data
  }

  moreGenreMovie(genreId, page =1 ) {
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/movie${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=5&with_genres=${genreId}`
    );
    return data
  }

  Movie2(genreId, page =1) {
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/movie${this.key}&sort_by=popularity.desc&with_genres=${genreId}&include_adult=false`
    );
    return data
  }
  

  popularShows() {
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`
  )
  return data;
  }

  genreShow(id, page = 1){
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=vote_average.desc&page=${page}&timezone=America%2FNew_York&vote_average.gte=5&vote_count.gte=100&with_genres=${id}&include_null_first_air_dates=false`
    )
    return data;
  }

  Show2(id, page =1){
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${id}&include_null_first_air_dates=false`
    )
    return data;
  }

  getRelated(type, id){
    let data = this.http.get(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&page=1`
    )
    return data;
  }


  topRatedShow(){
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=vote_average.desc&page=1&timezone=America%2FNew_York&vote_average.gte=5&vote_count.gte=500&include_null_first_air_dates=false`
    )
    return data
  }

  topRatedMovie(){
    let data = this.http.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=4233fc015e489c82cdd57b991d85d07b&language=en-US&sort_by=vote_average.desc&page=1&timezone=America%2FNew_York&vote_average.gte=5&vote_count.gte=500&include_null_first_air_dates=false`
    )
    return data
  }

}
