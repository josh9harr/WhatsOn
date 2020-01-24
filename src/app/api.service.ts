import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  start = 'http://api-public.guidebox.com/v2/';
  key = '?api_key=47921ad7902cbec22165877b54dce3609cb70bfc';
  type = 'movie';
  field = 'title';

  searchMovieData(search){
    let data = this.http.get(`${this.start}search${this.key}
    &type=${this.type}&field=${this.field}&query=${search}`);
    return data
  }

  searchShowData(search){
    let data = this.http.get(
      `${this.start}search${this.key}&type=show&field=${this.field}&query=${search}`
      );
      return data
  }

}
