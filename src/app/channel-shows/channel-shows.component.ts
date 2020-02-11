import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-shows',
  templateUrl: './channel-shows.component.html',
  styleUrls: ['./channel-shows.component.scss']
})
export class ChannelShowsComponent implements OnInit {
  counter = 1;
  shows;
  other
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
    channelName = this.route.snapshot.params.name;

  ngOnInit() {
    this.getShows(this.channelName)
  }

  getShows(name){
    if(name.includes(' ')){
      name = name.replace(' ', '_')
    }
    this.apiService.getChannelShows(name).subscribe(data => {
      this.shows = data;
      this.shows = this.shows.results
    })
  }

  getMoreShows(){
    let name = this.channelName;
    if(name.includes(' ')){
      name = name.replace(' ', '_')
    }
    this.apiService.getMoreShows(name, this.counter).subscribe(data => {
      this.other = data;
      this.other = this.other.results;
      this.other.forEach(element => {
        this.shows.push(element)
      });
    })
    this.counter += 1;
  }


  clicked(id){
    window.location.replace(`display/shows/${id}`)
  }

}
