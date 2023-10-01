import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router} from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
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
  popCharacter: PopCharacterResponse[] = [];

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/anime';
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

  onClick(animeId: string){
    console.log('Clicked on anime with ID:', animeId)
    this.router.navigate(['/animereview', animeId]);
  }
}
