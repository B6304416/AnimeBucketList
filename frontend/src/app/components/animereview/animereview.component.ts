import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ReviewResponse {
  animeId: string;
  userId: string;
  rate: number;
  comment: string;
}

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
}

@Component({
  selector: 'app-animereview',
  templateUrl: './animereview.component.html',
  styleUrls: ['./animereview.component.css']
})
export class AnimereviewComponent implements OnInit {

  reviewData: ReviewResponse[] = []
  animeData: AnimeResponse[] = []

  animeId: string | null;
  reviewUrl = 'http://localhost:5555/anime_review/rate/'
  animeUrl = 'http://localhost:5555/anime/';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    if (this.animeId !== null) {
      const reviewUrlbyId = `${this.reviewUrl}${this.animeId}`;
      const animeUrlbyId = `${this.animeUrl}${this.animeId}`;
      
      this.http.get<ReviewResponse[]>(reviewUrlbyId, { headers }).subscribe(
        (res) => {
          this.reviewData = res
          console.log(this.reviewData);
        });
        
      this.http.get<AnimeResponse[]>(animeUrlbyId).subscribe(
        (res) => {
          console.log('Response data:', res);
          this.animeData = res
          console.log(this.animeData)
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Anime ID is null.');
    }
  }
}
