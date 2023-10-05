import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface StudioResponse {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-post-anime',
  templateUrl: './post-anime.component.html',
  styleUrls: ['./post-anime.component.css']
})
export class PostAnimeComponent implements OnInit {

  anime = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    typeId: new FormControl('', [Validators.required]),
    studioId: new FormControl('', [Validators.required]),
    episode: new FormControl(null, [Validators.required, Validators.min(1)]),
    genre: new FormArray([], [Validators.required]),
    imgUrl: new FormControl(''),
    trailerUrl: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/)]),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(10)]),
    sourceId: new FormControl('', [Validators.required]),
  });

  studioOptions: StudioResponse[] = [];
  genreOptions: string[] = [];

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    const studioUrl = 'http://localhost:5555/anime/studios';
    this.http.get<StudioResponse[]>(studioUrl).subscribe(
      (res) => {
        this.studioOptions = res
        console.log(this.studioOptions)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const genreUrl = 'http://localhost:5555/genre';
    this.http.get<{ name: string }[]>(genreUrl).subscribe(
      (res) => {
        this.genreOptions = res.map(item => item.name);
        console.log(this.genreOptions);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const role = sessionStorage.getItem('role');
    if (role !== "1") {
      this.router.navigate(['/login']);
    } else {
      console.log('Users cannot access the admin section.');
    };

  }

  //ตรวจ id กับ name studio
  getStudioName(studioId: string | null | undefined): string {
    if (!studioId) {
      return 'Unknown';
    }
    const studio = this.studioOptions.find(s => s._id === studioId);
    return studio ? studio.name : 'Unknown Studio';
  }

  isValidGenre(genre: string): boolean {
    const genreArray = this.anime.get('genre') as FormArray;
    return genreArray.value.includes(genre);
  }

  toggleGenre(genre: string): void {
    const genreArray = this.anime.get('genre') as FormArray;
    if (genreArray.value.includes(genre)) {
      genreArray.removeAt(genreArray.value.indexOf(genre));
    } else {
      genreArray.push(new FormControl(genre));
    }
  }

  submitAnime() {
    const animeData = this.anime.value;
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:5555/anime', animeData, { headers, responseType: 'text' as 'json' }).subscribe(
      (response) => {
        console.log('Anime posted successfully', response);
        this.resetForm();
        this.showAlertMessage('Anime posted successfully', true)
      },
      (error) => {
        console.error('Error posting anime', error);
        this.showAlertMessage('Error: ' + error.message, false)
      }
    );

  }
  resetForm() {
    this.anime.reset();
    this.anime.setControl('genre', new FormArray([]));
  }

  showAlert: boolean = false;
  alertMessage: string = "alert—check it out!";
  alertClass: string = ''; // ตัวแปรสำหรับกำหนดคลาส CSS ของ alert

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.alertClass = isSuccess ? 'alert alert-success' : 'alert alert-warning';
    this.showAlert = true; // แสดง alert
    // หลังจาก 3 วินาที ซ่อน alert ลง
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
