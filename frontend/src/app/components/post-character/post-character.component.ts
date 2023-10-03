import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface dataResponse {
  _id: string | null;
  name: string;
}

interface MangaResponse {
  _id: string | null;
  name: string;
}

@Component({
  selector: 'app-post-character',
  templateUrl: './post-character.component.html',
  styleUrls: ['./post-character.component.css']
})
export class PostCharacterComponent implements OnInit {

  character = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    animeId: new FormControl(''),
    mangaId: new FormControl(''),
    imgProfile: new FormControl(null as File | null),
  });

  animeOptions: dataResponse[] = [];
  mangaOptions: MangaResponse[] = [];
  

  constructor(private http: HttpClient) { }
  
  selectedFile: File | null = null;
  profile?: string | ArrayBuffer | null = null;

  onFileSelected(event : any){
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Use FileReader to read the selected file and convert it to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profile = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
    // this.selectedFile = <File>event.target.files[0]
  }
  ngOnInit(): void {
    const animeUrl = 'http://localhost:5555/anime/detail/';
    this.http.get<dataResponse[]>(animeUrl).subscribe(
      (res) => {
        this.animeOptions = [
          { _id: null, name: 'Not from anime' },  
          ...res  
        ];
        console.log(this.animeOptions)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const mangaUrl = 'http://localhost:5555/manga/detail/';
    this.http.get<MangaResponse[]>(mangaUrl).subscribe(
      (res) => {
        this.mangaOptions = [
          { _id: null, name: 'Not from manga' },  
          ...res  
        ];
        console.log(this.mangaOptions)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getAnimeName(animeId: string | null | undefined): string {
    if (!animeId) {
      return 'Unknown';
    }
    const anime = this.animeOptions.find(item => item._id === animeId);
    return anime ? anime.name : 'Not from anime';
  }
  getMangaName(mangaId: string | null | undefined): string {
    if (!mangaId) {
      return 'Unknown';
    }
    const manga = this.mangaOptions.find(item => item._id === mangaId);
    return manga ? manga.name : 'Not from manga';
  }

  onSubmit() {
    const charData = this.character.value;
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
    if (charData.name && charData.detail && charData.animeId && charData.mangaId) {
      formData.append('name', charData.name);
      formData.append('detail', charData.detail);
      formData.append('animeId', charData.animeId);
      formData.append('mangaId', charData.mangaId);
    }
    if (this.selectedFile) {
      formData.append('imgProfile', this.selectedFile, this.selectedFile.name);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post('http://localhost:5555/character', formData, { headers }).subscribe(
      (response) => {
        console.log('Character posted successfully', response);
        alert('Character posted successfully')
        // this.resetForm();
      },
      (error) => {
        console.error('Error posting character', error);
        alert('Error: ' + error.message)
      }
    );
  }
  resetForm() {
    this.character.reset();
    this.profile = null;
  }
}
