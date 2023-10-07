import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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

  constructor(private http: HttpClient){}

  ngOnChanges(): void {
    if(this.fromMangaId){
      this.fetchData();
    }
  }

  ngOnInit(): void {
    // if(this.fromMangaId){
    //   this.fetchData();
    // }
  }

  baseUrl: string = 'http://localhost:5555';
  fetchData(){
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
}

