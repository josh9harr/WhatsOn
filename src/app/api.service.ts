import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  start = 'http://api-public.guidebox.com/v2/';
  key = '?api_key=fe76f71856ed2436347c8c0a1735deccf5a876e1';
  type = 'movie';
  field = 'title';
  results;
  thing;

  // searchMovieData(search){
  //   let data = this.http.get(`${this.start}search${this.key}
  //   &type=${this.type}&field=${this.field}&query=${search}`);
  //   return data
  // }

  // searchShowData(search){
  //   let data = this.http.get(
  //     `${this.start}search${this.key}&type=show&field=${this.field}&query=${search}`
  //     );
  //     return data
  // }

  
  searchChannel(search){
    let data = this.http.get(
      `${this.start}search${this.key}&type=channel&query=${search}`
      );
      return data
    }
    
    getMovieFromMovieDB(type, id){
      if(type == 'tv'){
        type='show';
      }
      if(type == 'movies'){
        type='movie'
      }

      let data = this.http.get(
        `${this.start}search${this.key}&type=${type}&field=id&id_type=themoviedb&query=${id}`
      );
      return data
    }

  displayMedia(thing,id){

    this.thing = this.http.get(
      `${this.start}${thing}/${id}${this.key}`
    );
    console.log(this.thing)
    return this.thing;


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
