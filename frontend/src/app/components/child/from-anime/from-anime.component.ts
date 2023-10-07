import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
  type: string;
  studio: string;
  source: string;
}

@Component({
  selector: 'app-from-anime',
  templateUrl: './from-anime.component.html',
  styleUrls: ['./from-anime.component.css']
})

export class FromAnimeComponent implements OnInit, OnChanges {
  
  @Input() fromAnimeId!: string|null;
  data: AnimeResponse[] = [];

  constructor(private http: HttpClient){}

  ngOnChanges(): void {
    if(this.fromAnimeId){
      this.fetchData();
    }
  }

  ngOnInit(): void {
    // if(this.fromAnimeId){
    //   this.fetchData();
    // }
  }

  fetchData(){
    const url = 'http://localhost:5555/anime/detail/'+this.fromAnimeId;
    this.http.get<AnimeResponse[]>(url).subscribe(
      (res) => {
        this.data = res
        console.log('child anime ',this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
