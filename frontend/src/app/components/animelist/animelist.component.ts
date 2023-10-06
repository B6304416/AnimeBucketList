import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
  imgCover: string;
  type: string;
  studio: string;
  source: string;
}

interface AnimeRateResponse {
  _id: string;
  totalRate: number;
  countRate: number;
  averageRate: number;
  animeName: string;
  animeEpisode: number;
  animeGenre: string;
  animeImgUrl: string;
  animeImgCover: string;
  animeSynopsis: string;
}

@Component({
  selector: 'app-animelist',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})

export class AnimelistComponent implements OnInit {

  data: AnimeResponse[] = [];
  animeData: AnimeRateResponse[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  baseUrl: string = 'http://localhost:5555';

  ngOnInit(): void {
    const url = 'http://localhost:5555/anime/detail';
    this.http.get<AnimeResponse[]>(url).subscribe(
      (res) => {
        this.data = res.map(anime => ({
          ...anime,
          imgCover: this.baseUrl + anime.imgCover
        }))
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const anime_url = 'http://localhost:5555/anime_review/avg_rate';
    this.http.get<AnimeRateResponse[]>(anime_url).subscribe(
      (res) => {
        res = res.map(anime => ({
          ...anime,
          animeImgCover: this.baseUrl + anime.animeImgCover
        })) 
        res.forEach(anime => {
          anime.averageRate = parseFloat(anime.averageRate.toFixed(1));
        });
        const sortedAnimeList = res.sort((a, b) => b.averageRate - a.averageRate);
        this.animeData = sortedAnimeList
        console.log('sorted: ',this.animeData)
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

  isAllClicked = true;
  isSortByScoreClicked = false;

  handleAllClick() {
    this.isAllClicked = !this.isAllClicked;
    this.isSortByScoreClicked = false;
  }

  handleSortByScoreClick() {
    this.isSortByScoreClicked = !this.isSortByScoreClicked;
    this.isAllClicked = false;
  }

}
