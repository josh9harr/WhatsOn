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


select(title){
  this.router.navigate([`results/${title}`])
}

}

