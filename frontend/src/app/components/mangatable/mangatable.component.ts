import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any; // ประกาศตัวแปร $ เพื่อใช้งาน jQuery

interface MangaResponse {
  _id: string;
  name: string;
  // episode: number;
  genre: string;
  imgUrl: string;
  // type: string;
  author: string;
  // source: string;
}

@Component({
  selector: 'app-mangatable',
  templateUrl: './mangatable.component.html',
  styleUrls: ['./mangatable.component.css']
})
export class MangatableComponent implements OnInit{

  data: MangaResponse[] = [];
  mangaToDelete: any; // เก็บ anime ที่ต้องการลบ
  mangaName?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchData()
  }
  
  fetchData(): void {
    const url = 'http://localhost:5555/manga/detail';
    this.http.get<MangaResponse[]>(url).subscribe(
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
    console.log('Clicked on manga with ID:', animeId);
    this.router.navigate(['/updateanime', animeId]);
  }

  // เมื่อคลิกปุ่มลบ
  confirmDelete(id: string, name: string) {
    this.mangaToDelete = id; 
    this.mangaName = name;
    $('#deleteConfirmationModal').modal('show'); // เปิด Modal ด้วย jQuery
    // console.log('Deleting anime:', this.animeToDelete);
  }
  // เมื่อยืนยันการลบ
  deleteConfirmed() {
    if (this.mangaToDelete) {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      // ส่ง HTTP DELETE เพื่อลบ Anime ที่มี animeId ที่ระบุ
      this.http.delete(`http://localhost:5555/manga/${this.mangaToDelete}`, { headers }).subscribe(
        (response) => {
          console.log('Manga deleted successfully', response);
          this.fetchData();
          // this.router.navigate(['/anime-list']); // หลังจากลบเสร็จให้เปลี่ยนเส้นทางไปยังหน้ารายการ Anime หรือหน้าอื่นที่เหมาะสม
        },
        (error) => {
          console.error('Error deleting anime', error);
          alert('Error: ' + error.message);
        }
      );
      this.closeModal()
    }
  }
  closeModal() {
    $('#deleteConfirmationModal').modal('hide');
    this.mangaToDelete = null
  }

}
