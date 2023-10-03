import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    name: new FormControl(''),
    typeId: new FormControl(''),
    studioId: new FormControl(''),
    episode: new FormControl(null),
    genre: new FormArray([]),
    imgUrl: new FormControl(''),
    trailerUrl: new FormControl(''),
    synopsis: new FormControl(''),
    sourceId: new FormControl('')
  });

  studioOptions: StudioResponse[] = [];
  genreOptions: string [] = [];

  constructor(private http: HttpClient) { }

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
        alert('Anime posted successfully')
        this.resetForm();

      },
      (error) => {
        console.error('Error posting anime', error);
        alert('Error: ' + error.message)
      }
    );

  }
  resetForm() {
    this.anime.reset(); 
    this.anime.setControl('genre', new FormArray([])); 
  }
}
