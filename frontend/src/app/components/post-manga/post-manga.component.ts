import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface AuthorResponse {
  _id: string;
  eng_name: string;
}
@Component({
  selector: 'app-post-manga',
  templateUrl: './post-manga.component.html',
  styleUrls: ['./post-manga.component.css']
})
export class PostMangaComponent implements OnInit {

  manga = new FormGroup({
    name: new FormControl(''),
    authorId: new FormControl(''),
    genre: new FormArray([]),
    imgUrl: new FormControl(''),
  });

  authorOptions: AuthorResponse[] = [];
  genreOptions: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const authorUrl = 'http://localhost:5555/manga/authors';
    this.http.get<AuthorResponse[]>(authorUrl).subscribe(
      (res) => {
        this.authorOptions = res
        console.log(this.authorOptions)
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
  getAuthorName(authorId: string | null | undefined): string {
    if (!authorId) {
      return 'Unknown';
    }
    const studio = this.authorOptions.find(s => s._id === authorId);
    return studio ? studio.eng_name : 'Unknown Author';
  }

  isValidGenre(genre: string): boolean {
    const genreArray = this.manga.get('genre') as FormArray;
    return genreArray.value.includes(genre);
  }

  toggleGenre(genre: string): void {
    const genreArray = this.manga.get('genre') as FormArray;
    if (genreArray.value.includes(genre)) {
      genreArray.removeAt(genreArray.value.indexOf(genre));
    } else {
      genreArray.push(new FormControl(genre));
    }
  }

  submitManga() {
    const mangaData = this.manga.value;
    const token = sessionStorage.getItem('token');
    console.log(mangaData)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:5555/manga', mangaData, { headers}).subscribe(
      (response) => {
        console.log('Manga posted successfully', response);
        alert('Manga posted successfully')
        this.resetForm();
      },
      (error) => {
        console.error('Error posting manga', error);
        alert('Error: ' + error.message)
      }
    );

  }
  resetForm() {
    this.manga.reset();
    this.manga.setControl('genre', new FormArray([]));
  }
}
