import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';
declare var window: any;

interface CharecterResponse {
  _id: string;
  name: string;
  score: number;
  imgUrl: string;
  anime: string;
  manga: string;
}

interface CharecterRateResponse {
  _id: string;
  totalRate: number;
  countRate: number;
  averageRate: number;
  mangaName: string;
  mangaGenre: string;
  mangaImgUrl: string;
}

// interface PopCharacterResponse {
//   name: string;
//   score: number;
//   imgUrl: string;
// }

@Component({
  selector: 'app-charecterlist',
  templateUrl: './charecterlist.component.html',
  styleUrls: ['./charecterlist.component.css']
})

export class CharecterlistComponent implements OnInit {

  data: CharecterResponse[] = [];
  mangaData: CharecterRateResponse[] = [];
  // popCharacter: PopCharacterResponse[] = [];

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/character/detail';
    this.http.get<CharecterResponse[]>(url).subscribe(
      (res) => {
        this.data = res
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const manga_url = 'http://localhost:5555/charecter/avg_rate';
    this.http.get<CharecterRateResponse[]>(manga_url).subscribe(
      (res) => {
        res.forEach(manga => {
          manga.averageRate = parseFloat(manga.averageRate.toFixed(1));
        });
        // Sort the array by averageRate in ascending order
        const sortedMangaList = res.sort((a, b) => b.averageRate - a.averageRate);
        this.mangaData = sortedMangaList
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    // const char_url = 'http://localhost:5555/character/popular';
    // this.http.get<PopCharacterResponse[]>(char_url).subscribe(
    //   (res) => {
    //     console.log('Response data:', res);
    //     this.popCharacter = res
    //     console.log(this.popCharacter)
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  onClick(animeId: string) {
    console.log('Clicked on manga with ID:', animeId);
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
