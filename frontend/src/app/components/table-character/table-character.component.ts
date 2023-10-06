import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any; // ประกาศตัวแปร $ เพื่อใช้งาน jQuery

interface CharacterResponse {
  _id: string;
  name: string;
  score: number;
  imgProfile: string;
  anime: string;
  animeId: string;
  manga: string;
  mangaId: string;
  detail: string;
}

@Component({
  selector: 'app-table-character',
  templateUrl: './table-character.component.html',
  styleUrls: ['./table-character.component.css']
})
export class TableCharacterComponent implements OnInit{

  data: CharacterResponse[] = [];
  animeToDelete: any; // เก็บ anime ที่ต้องการลบ
  animeName?: string;
  baseUrl: string = 'http://localhost:5555';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchData()
  }
  
  fetchData(): void {
    const url = 'http://localhost:5555/character/detail';
    this.http.get<CharacterResponse[]>(url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res.map(character => ({
          ...character,
          imgProfile: this.baseUrl + character.imgProfile
        }));
        
        console.log(this.data)
        console.log(this.data[0].imgProfile)
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

  // เมื่อคลิกปุ่มลบ
  confirmDelete(id: string, name: string) {
    this.animeToDelete = id; 
    this.animeName = name;
    $('#deleteConfirmationModal').modal('show'); // เปิด Modal ด้วย jQuery
    // console.log('Deleting anime:', this.animeToDelete);
  }
  // เมื่อยืนยันการลบ
  deleteConfirmed() {
    if (this.animeToDelete) {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      // ส่ง HTTP DELETE เพื่อลบ Anime ที่มี animeId ที่ระบุ
      this.http.delete(`http://localhost:5555/anime/${this.animeToDelete}`, { headers }).subscribe(
        (response) => {
          console.log('Anime deleted successfully', response);
          this.fetchData();
          // this.router.navigate(['/anime-list']); // หลังจากลบเสร็จให้เปลี่ยนเส้นทางไปยังหน้ารายการ Anime หรือหน้าอื่นที่เหมาะสม
        },
        (error) => {
          console.error('Error deleting anime', error);
          alert('Error: ' + error.message);
        }
      );
      this.animeToDelete = null;
      $('#deleteConfirmationModal').modal('hide'); // ปิด Modal ด้วย jQuery
    }
  }
}
