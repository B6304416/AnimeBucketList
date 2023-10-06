import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var window: any;

interface MangaResponse {
  _id: string;
  name: string;
  genre: string;
  imgUrl: string;
  imgCover: string;
  author: string;
}

interface MangaRateResponse {
  _id: string;
  totalRate: number;
  countRate: number;
  averageRate: number;
  mangaName: string;
  mangaGenre: string;
  mangaImgUrl: string;
  mangaImgCover: string;
}

@Component({
  selector: 'app-mangalist',
  templateUrl: './mangalist.component.html',
  styleUrls: ['./mangalist.component.css']
})

export class MangalistComponent implements OnInit {

  data: MangaResponse[] = [];
  mangaData: MangaRateResponse[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  baseUrl: string = 'http://localhost:5555';

  ngOnInit(): void {
    const url = 'http://localhost:5555/manga/detail';
    this.http.get<MangaResponse[]>(url).subscribe(
      (res) => {
        this.data = res.map(manga => ({
          ...manga,
          imgCover: this.baseUrl + manga.imgCover
        }))
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const manga_url = 'http://localhost:5555/manga/avg_rate';
    this.http.get<MangaRateResponse[]>(manga_url).subscribe(
      (res) => {
        res = res.map(manga => ({
          ...manga,
          mangaImgCover: this.baseUrl + manga.mangaImgCover
        })) 
        res.forEach(manga => {
          manga.averageRate = parseFloat(manga.averageRate.toFixed(1));
        });
        const sortedMangaList = res.sort((a, b) => b.averageRate - a.averageRate);
        this.mangaData = sortedMangaList
        console.log('sorted: ',this.mangaData)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(mangaId: string) {
    console.log('Clicked on manga with ID:', mangaId);
    this.router.navigate(['/mangareview', mangaId]);
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
