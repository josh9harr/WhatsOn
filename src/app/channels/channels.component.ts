import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channelList;
  other;
  counter = 1;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getChannels();
  }

  selected(channel){
    window.location.replace(`channels/${channel}`)
  }

  getChannels(){
    this.apiService.getChannels().subscribe(data => {
      this.other = data;
      this.channelList = this.other.results
      // console.log(this.channelList)
      document.getElementById('more').style.display = 'block';

    })
  }

  showMore(){
    this.apiService.getMoreChannels(this.counter).subscribe( data => {
      this.other = data;
      this.other = this.other.results
      this.other.forEach(element => {
        this.channelList.push(element)
      });
      if(this.other.length != 24){
        document.getElementById('more').style.display = 'none';
      }
    })
    this.counter += 1;
  }

  search(name){
    this.apiService.searchChannel(name).subscribe(data => {
      this.channelList = data;
      this.channelList = this.channelList.results;
      console.log(this.channelList)
    })
  }

}
