import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from '../api.service';
import { MovieDBService } from '../movie-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private movieDB: MovieDBService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    ) { 
    }
    
    ngOnInit() {
      this.getData()
      if(this.type=="shows"){
        this.getAllEpisodes(this.id)
      }
    };
    
    getData(){
          this.apiService.displayMedia(this.type,this.id).subscribe(data => {
            this.media = data,
            console.log(this.media)
              this.movieDB.displayMedia(this.type,this.media.themoviedb).subscribe(data => {
                this.mdbMedia = data
                console.log(this.mdbMedia)
              })
          })



        //if(this.media.subscription_web_sources.length() !=0){

          // this.safeLink = this.sanitizer.sanitize(SecurityContext.URL,this.media.subscription_web_sources[0].link),
          // console.log(this.safeLink),
          // // bypassSecurityTrustResourceUrl(this.media.subscription_web_sources[0].link),
          // console.log(this.media)
        //}
      
    };

    getAllEpisodes(id){
      this.apiService.displayAllEpisodes(this.id).subscribe(data => {
        this.episodeData = data;
        this.episodes = this.episodeData.results;
        console.log(this.episodeData)
        console.log(this.episodes)
      })
    }
    
    getEpisodes(id, season){
      this.apiService.displayEpisodeBySeason(this.id,season).subscribe(data => {
        this.episodeData = data,
        this.episodes = this.episodeData.results,
        this.newLink = this.episodes[0].subscription_web_sources[0].link;
        console.log(this.episodeData)
        console.log(this.episodes)
        console.log(this.newLink),
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.newLink),
        //this.sanitizer.sanitize(SecurityContext.URL,this.episodes[0].subscription_web_sources[0].link),
        console.log(this.safeLink),
        console.log(this.media)
      })
    };

    displayLink(link){
      window.open(link);
    }
    
    
    
    
    
    
  }
  