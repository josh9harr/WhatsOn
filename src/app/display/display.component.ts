import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'


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
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    ) { 
    }
    
    ngOnInit() {
      this.getData()
    };
    
    getData(){
      this.apiService.displayMedia(this.type,this.id).subscribe(data => [
        this.media = data,
        this.safeLink = this.sanitizer.sanitize(SecurityContext.URL,this.media.subscription_web_sources[0].link),
        console.log(this.safeLink),
        // bypassSecurityTrustResourceUrl(this.media.subscription_web_sources[0].link),
        console.log(this.media)
      ])
      
    };
    
    getEpisodes(id, season){
      this.apiService.displayEpisodeBySeason(this.id,season).subscribe(data => {
        this.episodeData = data,
        this.episodes = this.episodeData.results,
        console.log(this.episodeData)
        console.log(this.episodes)
      })
    };

    displayLink(link){
      window.open(link);
    }
    
    
    
    
    
    
  }
  