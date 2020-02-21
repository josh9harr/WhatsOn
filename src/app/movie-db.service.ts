import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDBService {

  constructor(private http: HttpClient) { }
  start = 'https://api.themoviedb.org/3/';
  key = '?api_key=917bf8547464514e193b8bc4841df69c';

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

    if(type == 'shows'){
      type='tv'
    }

    let data = this.http.get(
      `${this.start}${type}/${id}${this.key}`
    );
    return data;
  }

}
