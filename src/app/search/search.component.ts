import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movie;
  show;
  searchBar = new FormControl('');
  list = [];
  selectedMedia;
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  search(){
    this.movie = this.apiService.searchMovieData(this.searchBar.value).subscribe(data => {
      this.movie = data
      this.list = this.movie.results
      console.log(this.list)
    })
    this.show = this.apiService.searchShowData(this.searchBar.value).subscribe(data => {
      this.show = data
      this.show.results.forEach(element => {
        this.list.push(element)
      });
      console.log(this.list)
    })
  }

  select(media): void {
    this.selectedMedia = media
    this.router.navigate(['/display/',media.id])
  }

}

