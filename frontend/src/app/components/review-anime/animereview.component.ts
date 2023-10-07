import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ReviewResponse {
  // animeId: string;
  user: string;
  rate: number;
  comment: string;
}

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgCover: string;
  trailerUrl: string;
  synopsis: string;
  type: string;
  studio: string;
  source: string;
}

@Component({
  selector: 'app-animereview',
  templateUrl: './animereview.component.html',
  styleUrls: ['./animereview.component.css']
})
export class AnimereviewComponent implements OnInit {

  randomAvatarNumber?: number;
  reviewData: ReviewResponse[] = []
  animeData: AnimeResponse[] = []
  avatarNumbers: number[] = [];
  // videoUrls?: any
  forbiddenWords = ['เหี้ย', 'ห่า', 'สัด', 'ควย', 'หี', 'หำ', 'หัม', 'กระดอ', 'จิ๋ม', 'จู๋', 'เจี๊ยว', 'พ่อมึงตาย', 'แม่มึงตาย', 'เย็ด', 'ดอกทอง',
    'ควาย', 'กะหรี่', 'แมงดา', 'หน้าตัวเมีย', 'สถุน', 'สวะ', 'ส้นตีน', 'หมอย', 'ร่าน', 'เงี่ยน', 'ไพร่', 'สลัม', 'ถ่อย', 'ตอแหล', 'เสือก', 'หน้าด้าน',
    'แม่ง', 'แตด', 'ไอ้', 'ชิบหาย',
  ];

  review = new FormGroup({
    comment: new FormControl('', [this.forbiddenWordsValidator(this.forbiddenWords),]),
    rate: new FormControl(0),
    // userId: new FormControl(''),
    animeId: new FormControl(''),
  });

  animeId: string | null;
  reviewUrl = 'http://localhost:5555/anime_review/rate/'
  animeUrl = 'http://localhost:5555/anime/detail/';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }

  forbiddenWordsValidator(forbiddenWords: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;
      if (value) {
        for (const word of forbiddenWords) {
          if (value.toLowerCase().includes(word.toLowerCase())) {
            return { forbiddenWord: { value: control.value } };
          }
        }
      }
      return null;
    };
  }

  ngOnInit(): void {
    // this.comment.userId = '561'
    this.randomAvatarNumber = this.getRandomAvatarNumber(1, 9);

    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('userId');
    

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
          this.animeData = res.map(anime => ({
            ...anime,
            imgCover: 'http://localhost:5555' + anime.imgCover
          }))
          console.log("anime")
          console.log(this.animeData)


          this.review.patchValue({
            animeId: this.animeData[0]._id, // Assuming there's at least one anime in the array
            // userId: user
          });
          const iframe = document.getElementById("animeTrailer") as HTMLIFrameElement;;
          if (iframe) {
            console.log(this.animeData[0].trailerUrl)
            iframe.src = this.animeData[0].trailerUrl;
          } else {
            console.warn("");
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Anime ID is null.');
    }
    for (let i = 0; i < 100; i++) {
      this.avatarNumbers.push(this.getRandomAvatarNumber(1, 9));
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
    console.log('hahah', review)
    console.log('hahah', review)
    const token = sessionStorage.getItem('token');
    console.log(review)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:5555/anime_review', review, { headers }).subscribe(
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