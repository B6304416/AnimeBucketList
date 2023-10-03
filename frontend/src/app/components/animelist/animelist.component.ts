import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';
declare var window: any;

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

interface AnimeRateResponse {
  _id: string;
  totalRate: number;
  countRate: number;
  averageRate: number;
  animeName: string;
  animeEpisode: number;
  animeGenre: string;
  animeImgUrl: string;
  animeSynopsis: string;
}

interface PopCharacterResponse {
  name: string;
  score: number;
  imgUrl: string;
}

@Component({
  selector: 'app-animelist',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})

export class AnimelistComponent implements OnInit {

  data: AnimeResponse[] = [];
  animeData: AnimeRateResponse[] = [];
  popCharacter: PopCharacterResponse[] = [];


  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/anime/detail';
    this.http.get<AnimeResponse[]>(url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const anime_url = 'http://localhost:5555/anime_review/avg_rate';
    this.http.get<AnimeRateResponse[]>(anime_url).subscribe(
      (res) => {
        console.log('res',res)
        res.forEach(anime => {
          anime.averageRate = parseFloat(anime.averageRate.toFixed(1));
        });
        // Sort the array by averageRate in ascending order
        const sortedAnimeList = res.sort((a, b) => b.averageRate - a.averageRate);
        this.animeData = sortedAnimeList
        console.log('data',this.animeData)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const char_url = 'http://localhost:5555/character/popular';
    this.http.get<PopCharacterResponse[]>(char_url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.popCharacter = res
        console.log(this.popCharacter)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(animeId: string) {
    console.log('Clicked on anime with ID:', animeId);
    this.router.navigate(['/animereview', animeId]);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // เลื่อนไปที่ด้านบนสุดของหน้าเว็บ
    window.scrollTo(0, 0); // กระโดดไปที่ด้านบนสุดของหน้าเว็บทันที
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
