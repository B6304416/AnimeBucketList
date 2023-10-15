import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CircularJSON from 'circular-json';

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
    newStudio: new FormControl(''),
    episode: new FormControl(null, [Validators.required, Validators.min(1)]),
    genre: new FormArray([], [Validators.required]),
    imgUrl: new FormControl(''),
    trailerUrl: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?youtube\.com\/embed\/(?<videoId>[\w\-]+)$/)]),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(10)]),
    sourceId: new FormControl('', [Validators.required]),
    // imgCover: new FormControl(null as File | null),
    imgCover: new FormControl(null, [
      Validators.required,
      Validators.pattern(/\.(jpg|png)$/i) // เพิ่ม Validators.pattern สำหรับระบุนามสกุลไฟล์
    ]),
  });

  studioOptions: StudioResponse[] = [];
  genreOptions: string[] = [];
  selectedFile: File | null = null;
  cover?: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private router: Router,) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.cover = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

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

    // Check if studioId is 'new' (indicating a new studio is being created)
    if (animeData.studioId === 'new') {
      // Create a new studio with the provided name
      const newStudioName = this.anime.get('newStudio')?.value;
      if (newStudioName) {
        const dataToPost = CircularJSON.stringify({ name: newStudioName });
        const parsedData = CircularJSON.parse(dataToPost);
        this.http.post('http://localhost:5555/anime/studio', parsedData, { headers }).subscribe(
          (response: any) => {
            console.log(' New studio successfully', response);
            animeData.studioId = response._id
            console.log("1    1" + animeData.studioId)
            this.newdata(animeData)

          },
          (error) => {
            console.error('Error creating new studio', error);
            console.log(parsedData)
          }
        );
      } else {
        console.error('Error: New studio name is required.');
        return;
      }
    } else {
      this.newdata(animeData)
    }
  }
  resetForm() {
    this.anime.reset();
    this.anime.setControl('genre', new FormArray([]));
    this.cover = null;
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

  newdata(Data: any) {
    const animeData = Data
    const formData = new FormData();
    console.log("mai  " + animeData.studioId)
    if (animeData.name && animeData.typeId && animeData.studioId &&
      animeData.episode && animeData.sourceId && animeData.synopsis && animeData.trailerUrl) {
      formData.append('name', animeData.name);
      formData.append('typeId', animeData.typeId);
      formData.append('studioId', animeData.studioId);
      formData.append('episode', animeData.episode);
      formData.append('sourceId', animeData.sourceId);
      formData.append('synopsis', animeData.synopsis);
      formData.append('trailerUrl', animeData.trailerUrl);
    }
    const genres = this.anime.get('genre')!.value as string[];
    genres.forEach((genre, index) => {
      formData.append(`genre[${index}]`, genre);
    });


    if (this.selectedFile) {
      formData.append('imgProfile', this.selectedFile, this.selectedFile.name);
    }

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:5555/anime', formData, { headers }).subscribe(
      (response) => {
        console.log('Anime posted successfully', response);
        this.resetForm();
        this.showAlertMessage('Anime posted successfully', true)
      },
      (error) => {
        console.error('Error posting anime', error);
        console.log(formData)
        this.showAlertMessage('Error: ' + error.message, false)
      }
    );

  }

}
