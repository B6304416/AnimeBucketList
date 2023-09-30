import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    synopsis: new FormControl(''),
    sourceId: new FormControl('')
  });

  studioOptions = [
    { id: '6513dc34e62aa885492968c6', name: 'Madhouse' },
    { id: '6513dc33e62aa885492968c4', name: 'Bones' },
  ];

  genreOptions = [
    'Action',
    'Sport',
    'Harem',
    'Adventure',
    'Shoujo',
    'Isekai',
    'Drama',
    'Shonen',
    'Comedy',
    'Fantasy'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  //ตรวจ id กับ name studio
  getStudioName(studioId: string | null | undefined): string {
    if (!studioId) {
      return 'Unknown';
    }
    const studio = this.studioOptions.find(s => s.id === studioId);
    return studio ? studio.name : 'Unknown Studio';
  }

  // เพิ่มเมทอดสำหรับการตรวจสอบความถูกต้องของ Radio Button หลายค่า
  isValidGenre(genre: string): boolean {
    const genreArray = this.anime.get('genre') as FormArray;
    return genreArray.value.includes(genre);
  }

  // เพิ่มเมทอดสำหรับการเพิ่มหรือลบค่าใน FormArray
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
    // Replace 'YOUR_TOKEN' with your actual token
    const token = sessionStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // ส่งข้อมูลไปยังแบ็คเอนด์
    this.http.post('http://localhost:5555/anime', animeData, { headers, responseType: 'text' as 'json' }).subscribe(
      (response) => {
        // การจัดการกับการตอบสนองจากแบ็คเอนด์ (ตามความเหมาะสม)
        console.log('Anime posted successfully', response);
        alert('Anime posted successfully')

      },
      (error) => {
        // การจัดการเมื่อเกิดข้อผิดพลาดในการส่งข้อมูล
        console.error('Error posting anime', error);
        alert('Error: ' + error.message)
      }
    );

  }



}
