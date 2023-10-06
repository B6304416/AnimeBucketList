import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
    imgCover: new FormControl(null as File | null),
  });

  authorOptions: AuthorResponse[] = [];
  genreOptions: string[] = [];
  selectedFile: File | null = null;
  cover?: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private router: Router,) { }

  onFileSelected(event : any){
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

    const role = sessionStorage.getItem('role');
    if (role !== "1") {
      this.router.navigate(['/login']);
    } else {
      console.log('Users cannot access the admin section.');
    };

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
    const formData = new FormData();
  
    if (mangaData.name && mangaData.authorId) {
      formData.append('name', mangaData.name);
      formData.append('authorId', mangaData.authorId);
    }

    const genres = this.manga.get('genre')!.value as string[];
    genres.forEach((genre, index) => {
      formData.append(`genre[${index}]`, genre);
    });
  
    const token = sessionStorage.getItem('token');
  
    if (this.selectedFile) {
      formData.append('imgProfile', this.selectedFile, this.selectedFile.name);
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    this.http.post('http://localhost:5555/manga', formData, { headers }).subscribe(
      (response) => {
        console.log('Manga posted successfully', response);
        alert('Manga posted successfully');
        // this.resetForm();
      },
      (error) => {
        console.error('Error posting manga', error);
        alert('Error: ' + error.message);
      }
    );
  }
  
  resetForm() {
    this.manga.reset();
    this.manga.setControl('genre', new FormArray([]));
    this.cover = null;
  }
}

