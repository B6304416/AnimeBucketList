import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  synopsis: string;
  sourceId: string;
  typeId: string;
}

@Component({
  selector: 'app-animereview',
  templateUrl: './animereview.component.html',
  styleUrls: ['./animereview.component.css']
})
export class AnimereviewComponent implements OnInit {

  reviewData: ReviewResponse[] = []
  animeData: AnimeResponse[] = []
  avatarNumbers: number[] = [];

  review = new FormGroup({
    comment: new FormControl(''),
    rate: new FormControl(0),
    userId: new FormControl(''),
    animeId: new FormControl(''),
  });

  animeId: string | null;
  reviewUrl = 'http://localhost:5555/anime_review/rate/'
  animeUrl = 'http://localhost:5555/anime/';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    // this.comment.userId = '561'
    const token = sessionStorage.getItem('token');
    const user = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    if (this.animeId !== null) {
      const reviewUrlbyId = `${this.reviewUrl}${this.animeId}`;
      const animeUrlbyId = `${this.animeUrl}${this.animeId}`;

      this.http.get<ReviewResponse[]>(reviewUrlbyId, { headers }).subscribe(
        (res) => {
          this.reviewData = res
          console.log("review")
          console.log(this.reviewData);
        });

      this.http.get<AnimeResponse[]>(animeUrlbyId).subscribe(
        (res) => {
          this.animeData = res
          console.log("anime")
          console.log(this.animeData)
          this.review.patchValue({
            animeId: this.animeData[0]._id, // Assuming there's at least one anime in the array
            userId: user
          });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Anime ID is null.');
    }
    for (let i = 0; i < 100; i++) {
      this.avatarNumbers.push(this.getRandomAvatarNumber(1, 7));
    }
  }

  fetchReviewData() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    const reviewUrlbyId = `${this.reviewUrl}${this.animeId}`;
  
    this.http.get<ReviewResponse[]>(reviewUrlbyId, { headers }).subscribe(
      (res) => {
        this.reviewData = res;
        console.log("review");
        console.log(this.reviewData);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  
  getRandomAvatarNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  submitAnime() {
    const review = this.review.value;
    const token = sessionStorage.getItem('token');
    console.log(review)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:5555/anime_review', review, { headers, responseType: 'text' as 'json' }).subscribe(
      (response) => {
        console.log('Anime posted successfully', response);
        this.resetForm();
        this.fetchReviewData(); // เรียกดึงข้อมูล Anime ใหม่หลังจากการโพสต์ Anime สำเร็จ

      },
      (error) => {
        console.error('Error posting anime', error);
        alert('Error: ' + error.message)
      }
    );


  }
  resetForm() {
    this.review.reset();
  }
}
