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
      this.movie = data,
      this.list = this.movie.results
      
    })
    this.show = this.apiService.searchShowData(this.searchBar.value).subscribe(data => {
      this.show = data,
      this.show.results.forEach(element => {
        this.list.push(element)
      });
      
    })
  }

  selectMovie(media): void {
    this.searchBar = new FormControl('');
    this.list = [];
    this.router.navigate(['/display/','movies',media.id])
    // location.reload()
  }

  selectShow(media): void {
    this.searchBar = new FormControl('');
    this.list = [];
    this.router.navigate(['/display/','shows',media.id])
    // location.reload()
  }

}

