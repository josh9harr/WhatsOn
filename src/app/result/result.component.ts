import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  movie;
  show;
  title = this.route.snapshot.params.title
  list = [];

  selectedMedia;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.search(this.title)
  }

  search(title){
    console.log(title)
    this.movie = this.apiService.searchMovieData(title).subscribe(data => {
      this.movie = data,
      this.list = this.movie.results
      console.log(this.list)
      
    })
    this.show = this.apiService.searchShowData(title).subscribe(data => {
      this.show = data,
      this.show.results.forEach(element => {
        this.list.push(element)
      });
      console.log(this.list)
      
    })
  }

  selectMovie(media): void {
    this.router.navigate(['/display/','movies',media.id])
  }

  selectShow(media): void {
    this.router.navigate(['/display/','shows',media.id])
  }

}
