import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
  type: string;
  studio: string;
  source: string;
}

@Component({
  selector: 'app-animetable',
  templateUrl: './animetable.component.html',
  styleUrls: ['./animetable.component.css']
})
export class AnimetableComponent implements OnInit{

  data: AnimeResponse[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchData()
  }
  
  fetchData(): void {
    const url = 'http://localhost:5555/anime/detail';
    this.http.get<AnimeResponse[]>(url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(animeId: string) {
    console.log('Clicked on anime with ID:', animeId);
    this.router.navigate(['/updateanime', animeId]);
  }

  deleteAnime(animeId: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    // ส่ง HTTP DELETE เพื่อลบ Anime ที่มี animeId ที่ระบุ
    this.http.delete(`http://localhost:5555/anime/${animeId}`, { headers }).subscribe(
      (response) => {
        console.log('Anime deleted successfully', response);
        alert('Anime deleted successfully');
        this.fetchData();
        // this.router.navigate(['/anime-list']); // หลังจากลบเสร็จให้เปลี่ยนเส้นทางไปยังหน้ารายการ Anime หรือหน้าอื่นที่เหมาะสม
      },
      (error) => {
        console.error('Error deleting anime', error);
        alert('Error: ' + error.message);
      }
    );
  }

  

}
