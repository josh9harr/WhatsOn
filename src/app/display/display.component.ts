import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from '../api.service';
import { MovieDBService } from '../movie-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { AngularFireAuth } from "@angular/fire/auth";
import { Pipe, PipeTransform } from '@angular/core';
import { CRUDService } from '../crud.service';
import { ClassStmt } from '@angular/compiler';
import { ControlContainer } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

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
  inFave;
  list;

  constructor(
    private apiService: ApiService,
    private crudService: CRUDService,
    private movieDB: MovieDBService,
    private router: Router,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private sanitizer: DomSanitizer,
    ) { 
      this.se = new FormGroup({
        seasonNum: new FormControl()
      });
    }
    
    ngOnInit() {
      this.getData()
      };
      
      getData(){
          this.inFave =false;

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
            this.checkList(this.type, this.mdbMedia)
          })
        }
        if(this.type =='tv'){
          this.apiService.displayMedia('shows',this.results.id).subscribe(data => {
            this.media = data,
            console.log(this.media)
            this.checkList(this.type, this.mdbMedia)

          })
        }
        
      });
      
      this.getRelatedShow();
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
          // console.log(this.episodes)
          document.getElementById('more').style.display = 'block';
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
        this.counter +=1;
      });
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
      this.movieDB.getRelated(this.type, this.id).subscribe(data => {
        this.related = data;
        this.related = this.related.results;
        console.log(this.related)
      })
    }
    
    
    addToList(media){
      this.fireAuth.auth.onAuthStateChanged(user => {
        if(user){
          this.crudService.addToList(user,media, this.type, 'Favorites');
          let added = document.getElementById('added');
          alert(`Added to List`)
        }else{
          alert("You need to have an account to save items to your list.")
        }
      }
    )}

    deleteFromList(media){
      this.fireAuth.auth.onAuthStateChanged(user => {
        if(user) {
          this.crudService.deleteFromList(user,media,'Favorites');
          this.inFave = false;
          alert(`Removed from List`)
        }
      })
    }

    checkList(type, media){
      this.fireAuth.auth.onAuthStateChanged(user => {
        if(user) {
          let list = this.crudService.readList(user.uid,"Favorites").subscribe(data => {
            data.map(e =>{
              let test = e.payload.doc.id;
              // console.log(test)
              if(type == 'movie'){
                if(media.title==test){
                  this.inFave = true;
                  // console.log(this.inFave)
                }
              }

              if(type=='tv'){
                if(media.name==test){
                  this.inFave = true;
                  // console.log(this.inFave)
                }
              }
            })
          })
        }
      })
    }

    toChannel(name){
      if(name.includes(' ')){
        name = name.replace(' ', '_')
      }
      window.location.replace(`channels/${name}`)
    }

    openTab(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById(cityName).style.display = "block";
      document.getElementById(cityName).classList.add(' active');
      // evt.currentTarget.className += " active";
    }





  }
  