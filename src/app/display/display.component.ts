import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from '../api.service';
import { MovieDBService } from '../movie-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';
import { ClassStmt } from '@angular/compiler';
import { ControlContainer } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';


@Pipe({
  name: 'safe'
})

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  
  type = this.route.snapshot.params.type;
  id = this.route.snapshot.params.id;
  media;
  episodeData;
  episodes;
  safeLink;
  newLink;
  guidebox;
  results
  moviedbId;
  mdbMedia;
  cast;
  otherType;
  imageBase = 'https://image.tmdb.org/t/p/';
  size = 'original';
  image;
  seasonNum = 0;
  counter = 1;
  more;
  se;
  related;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private movieDB: MovieDBService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    ) { 
      this.se = new FormGroup({
        seasonNum: new FormControl(0)
      });
    }
    
    ngOnInit() {
      this.getData()
      };
      
      getData(){
        this.movieDB.displayMedia(this.type,this.id).subscribe(data => {
          this.mdbMedia = data
          console.log(this.mdbMedia)
          this.image = this.imageBase+this.size+this.mdbMedia.backdrop_path;
          this.setImage(this.image)
      })
      this.getCast(this.type,this.id);
      
      this.apiService.getMovieFromMovieDB(this.type,this.id).subscribe(stuff => {
        this.results = stuff

        if(this.type == 'movie'){
          this.apiService.displayMedia('movies',this.results.id).subscribe(data => {
            this.media = data,
            console.log(this.media)
          })
        }
        if(this.type =='tv'){
          this.apiService.displayMedia('shows',this.results.id).subscribe(data => {
            this.media = data,
            console.log(this.media)
          })
          this.getRelatedShow();
        }
  
      });

    };

    getCast(type,id){
      this.movieDB.getCast(type,id).subscribe(data => {
        this.cast = data;
      })
    }

    getEpisodesBySeason(){
      document.getElementById('more').style.display = 'display';
      this.apiService.getMovieFromMovieDB(this.type,this.id).subscribe(data => {
        this.results = data;

        this.apiService.getEpisodeBySeason(this.results.id,this.seasonNum).subscribe(data => {
          this.episodeData = data;
  
          this.episodes = this.episodeData.results
          console.log(this.episodes)
          return this.episodes;
        })
      })

    }

    getMoreEpisodes() {
      console.log('MOre coming right up')
      this.apiService.getMovieFromMovieDB(this.type,this.id).subscribe(data => {
        this.results = data;
        
        this.apiService.getMoreEpisodes(this.results.id,this.seasonNum,this.counter).subscribe(data => {
          this.more = data;
          this.more = this.more.results;
          console.log(this.more)
          this.more.forEach(element => {
            this.episodes.push(element)
          });

          if(this.more.length != 12){
            document.getElementById('more').style.display = 'none';
          }

        })
      });
      this.counter +=1;
    }

    displayLink(link){
       window.open(link);
    }
  
    setImage(url){
      document.getElementById('test').style.background = `url(${url})`;
      document.getElementById('test').style.backgroundRepeat = `no-repeat`;
      document.getElementById('test').style.backgroundSize = `cover`;

    }

    getRelatedShow(){
      this.movieDB.getRelatedShow(this.id).subscribe(data => {
        this.related = data;
        this.related = this.related.results;
        console.log(this.related)
      })
    }
    
    
    
  }
  