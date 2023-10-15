import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

interface MangaResponse {
  _id: string;
  name: string;
  genre: string;
  imgCover: string;
}

@Component({
  selector: 'app-from-manga',
  templateUrl: './from-manga.component.html',
  styleUrls: ['./from-manga.component.css']
})
export class FromMangaComponent implements OnInit,OnChanges {
  
  @Input() fromMangaId!: string|null;
  data: MangaResponse[] = [];

  constructor(private http: HttpClient, private router: Router){}

  ngOnChanges(): void {
    if(this.fromMangaId){
      this.fetchManga();
    }
  }

  ngOnInit(): void {
    // if(this.fromMangaId){
    //   this.fetchData();
    // }
  }

  baseUrl: string = 'http://localhost:5555';
  fetchManga(){
    const url = 'http://localhost:5555/manga/'+this.fromMangaId;
    this.http.get<MangaResponse[]>(url).subscribe(
      (res) => {
        this.data = res.map(manga => ({
          ...manga,
          imgCover: this.baseUrl + manga.imgCover
        })) 
        console.log('manga is :',this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(animeId: string) {
    console.log('Clicked on manga with ID:', animeId);
    this.router.navigate(['/mangareview', animeId]);
    window.scrollTo(0, 0); 
  }
}

