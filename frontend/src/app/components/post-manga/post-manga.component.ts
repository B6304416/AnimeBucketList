import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
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
    name: new FormControl('', [Validators.required]),
    authorId: new FormControl('', [Validators.required]),
    genre: new FormArray([], [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
    // imgCover: new FormControl(null as File | null, [Validators.required]),
    imgCover: new FormControl(null, [
      Validators.required,
      Validators.pattern(/\.(jpg|png)$/i) // เพิ่ม Validators.pattern สำหรับระบุนามสกุลไฟล์
    ]),
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
    // this.submitted = true;
  
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
    
    if (this.manga.get('name')?.hasError('required') ||
      this.manga.get('authorId')?.hasError('required') ||
      this.manga.get('genre')?.hasError('required') ||
      this.manga.get('imgUrl')?.hasError('required') ||
      this.manga.get('imgCover')?.hasError('required') ||
      this.manga.get('imgCover')?.hasError('pattern')
      ) {
        
        this.showAlertMessage('Error: Please enter valid data.' , false)
      return;
    }
  
    this.http.post('http://localhost:5555/manga', formData, { headers }).subscribe(
      (response) => {
        console.log('Manga posted successfully', response);
        this.resetForm();
        this.showAlertMessage('Manga posted successfully', true)
      },
      (error) => {
        console.error('Error posting manga', error);
        this.showAlertMessage('Error: ' + error.message, false)
      }
    );
    console.log("submit work")

  }
  
  resetForm() {
    this.manga.reset();
    this.manga.setControl('genre', new FormArray([]));
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
}

