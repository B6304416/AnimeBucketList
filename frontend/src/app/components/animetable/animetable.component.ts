import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  selector: 'app-animetable',
  templateUrl: './animetable.component.html',
  styleUrls: ['./animetable.component.css']
})
export class AnimetableComponent implements OnInit{

  data: AnimeResponse[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
  }

}
