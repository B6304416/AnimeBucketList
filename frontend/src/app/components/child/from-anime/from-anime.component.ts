import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgCover: string;
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

  constructor(private http: HttpClient, private router: Router){}

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
  baseUrl: string = 'http://localhost:5555';
  fetchData(){
    const url = 'http://localhost:5555/anime/detail/'+this.fromAnimeId;
    this.http.get<AnimeResponse[]>(url).subscribe(
      (res) => {
        this.data = res.map(anime => ({
          ...anime,
          imgCover: this.baseUrl + anime.imgCover
        })) 
        console.log('child anime ',this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(animeId: string) {
    console.log('Clicked on anime with ID:', animeId);
    this.router.navigate(['/animereview', animeId]);
    window.scrollTo(0, 0); 
  }
}
