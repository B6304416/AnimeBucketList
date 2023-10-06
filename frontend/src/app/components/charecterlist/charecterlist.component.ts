import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';
declare var window: any;

interface CharacterResponse {
  _id: string;
  name: string;
  score: number;
  imgProfile: string;
  anime: string;
  manga: string;
}

// interface CharecterRateResponse {
//   _id: string;
//   totalRate: number;
//   countRate: number;
//   averageRate: number;
//   mangaName: string;
//   mangaGenre: string;
//   mangaImgUrl: string;
// }

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

  data: CharacterResponse[] = [];
  // mangaData: CharecterRateResponse[] = [];
  characters: any[] = [];

  // popCharacter: PopCharacterResponse[] = [];

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  baseUrl: string = 'http://localhost:5555';

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/character/detail';
    this.http.get<CharacterResponse[]>(url).subscribe(
      (res) => {
        this.characters = res.map(character => ({
          ...character,
          imgProfile: this.baseUrl + character.imgProfile
        }));
        console.log(this.characters);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    // const manga_url = 'http://localhost:5555/charecter/avg_rate';
    // this.http.get<CharecterRateResponse[]>(manga_url).subscribe(
    //   (res) => {
    //     res.forEach(manga => {
    //       manga.averageRate = parseFloat(manga.averageRate.toFixed(1));
    //     });
    //     const sortedMangaList = res.sort((a, b) => b.averageRate - a.averageRate);
    //     this.mangaData = sortedMangaList
    //     console.log(this.data)
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
