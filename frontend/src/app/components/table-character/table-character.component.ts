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
  characterToDelete: any; 
  characterName?: string;
  baseUrl: string = 'http://localhost:5555';
  searchQuery: string = '';
  filteredData: CharacterResponse[] = [];
  p: number = 1; // เพิ่มตัวแปร p สำหรับควบคุมหน้าปัจจุบัน

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
        this.filteredData = this.data
        console.log(this.data)
        console.log(this.data[0].imgProfile)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(characterId: string) {
    console.log('Clicked on character with ID:', characterId);
    this.router.navigate(['/updatecharacter', characterId]);
  }

  // เมื่อคลิกปุ่มลบ
  confirmDelete(id: string, name: string) {
    this.characterToDelete = id; 
    this.characterName = name;
    $('#deleteConfirmationModal').modal('show'); // เปิด Modal ด้วย jQuery
  }
  // เมื่อยืนยันการลบ
  deleteConfirmed() {
    if (this.characterToDelete) {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      this.http.delete(`http://localhost:5555/character/${this.characterToDelete}`, { headers }).subscribe(
        (response) => {
          console.log('Character deleted successfully', response);
          this.fetchData();
        },
        (error) => {
          console.error('Error deleting character', error);
          alert('Error: ' + error.message);
        }
      );
      this.characterToDelete = null;
      $('#deleteConfirmationModal').modal('hide'); // ปิด Modal ด้วย jQuery
    }
  }
  onSearchChange() {
    if (this.searchQuery === '') {
      // ถ้าค่าค้นหาเป็นสตริงว่าง ให้แสดงข้อมูลทั้งหมด
      this.filteredData = this.data;
    } else {
      // ไม่งั้น กรองข้อมูล Anime ตามคำค้นหา
      this.filteredData = this.data.filter(anime => {
        return (
          anime.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          anime.anime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          anime.manga.toLowerCase().includes(this.searchQuery.toLowerCase()) 
        );
      });
    }
    this.p = 1;
  }
}
