import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  start = 'http://api-public.guidebox.com/v2/';
  key = '?api_key=a5939041bafb193157493411e07ff0dca59f424b';
  // 47921ad7902cbec22165877b54dce3609cb70bfc';
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

  displayMedia(thing, id){
    let data = this.http.get(
      `${this.start}${thing}/${id}${this.key}`
    );
    return data
  }

  displayAllEpisodes(showId){
    let data = this.http.get(
      `${this.start}shows/${showId}/episodes${this.key}&include_links=true&limit=25&reverse_ordering=true`
    )
    return data
  }
  displayEpisodeBySeason(showId, season){
    let data = this.http.get(
      `${this.start}shows/${showId}/episodes${this.key}&include_links=true&limit=35&season=${season}`
    )
    return data
  }

  getChannels(){
    let data = this.http.get(
      `${this.start}channels${this.key}&limit=24`
    )
    return data
  }

  getMoreChannels(page: number){
    let num = page*24;
    let data = this.http.get(
      `${this.start}channels${this.key}&limit=24&offset=${num}`
    )
    return data;
  }

  getChannelShows(name: string){
    let data = this.http.get(
      `${this.start}shows${this.key}&channel=${name}&limit=24`
    )
    return data
  }

  getMoreShows(name: string, page: number){
    let num = page*24;
    let data = this.http.get(
      `${this.start}shows${this.key}&channel=${name}&limit=24&offset=${num}`
    )
    return data;
  }

}
