import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface AuthorResponse {
  _id: string;
  name: string;
}

interface MangaResponse {
  _id: string;
  name: string;
  genre: string;
  imgUrl: string;
  imgCover: string;
  authorId: string;
}

@Component({
  selector: 'app-update-manga',
  templateUrl: './update-manga.component.html',
  styleUrls: ['./update-manga.component.css']
})
export class UpdateMangaComponent implements OnInit {

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
  
  mangaData: MangaResponse[] = []
  authorOptions: AuthorResponse[] = [];
  genreOptions: string[] = [];
  baseUrl: string = 'http://localhost:5555';

  mangaUrl = 'http://localhost:5555/manga/';
  mangaId: string | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
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

    //get amime detail
    if (this.mangaId !== null) {
      const mangaUrlbyId = `${this.mangaUrl}${this.mangaId}`;
      this.http.get<MangaResponse[]>(mangaUrlbyId).subscribe(
        (res) => {
          res = res.map(manga => ({
            ...manga,
            imgCover: this.baseUrl + manga.imgCover
          })) 
          this.mangaData = res;

          // นำข้อมูลที่ดึงมาใส่ใน form anime
          const mangaResponse = this.mangaData[0];

          // ตรวจสอบ genre และตั้งค่า checkbox ตาม genre ใน animeResponse.genre
          Array.from(mangaResponse.genre).forEach((genre: string) => {
            this.toggleGenre(genre);
          });

          this.manga.patchValue({
            name: mangaResponse.name,
            authorId: mangaResponse.authorId,
            // genre: mangaResponse.genre,
            // episode: mangaResponse.episode,
            // trailerUrl: mangaResponse.trailerUrl,
            // sourceId: mangaResponse.sourceId,
            // typeId: mangaResponse.typeId,
          });

          console.log("manga");
          console.log(this.mangaData);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Manga ID is null.');
    }


  }

  //ตรวจ id กับ name studio
  getAuthorName(authorId: string | null | undefined): string {
    if (!authorId) {
      return 'Unknown';
    }
    const author = this.authorOptions.find(a => a._id === authorId);
    return author ? author.name : 'Unknown Studio';
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

  UpdateManga() {
    const mangaData = this.manga.value;
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const mangaId = this.mangaId; // รับค่า animeId จาก route parameter

    // ส่งค่า animeData และใช้ HTTP PUT เพื่ออัปเดต Anime ที่มี animeId ตามที่ระบุ
    this.http.put(`http://localhost:5555/manga/${mangaId}`, mangaData, { headers, responseType: 'text' as 'json' }).subscribe(
      (response) => {
        console.log('Manga updated successfully', response);
        this.showAlertMessage('Update successfully',true)
      },
      (error) => {
        console.error('Error updating manga', error);
        this.showAlertMessage('Error: ' + error.message,false)
      }
    );
  }

  showAlert: boolean = false; 
  alertMessage: string = "alert—check it out!";
  alertClass: string = '';
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
