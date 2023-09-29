import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-post-anime',
  templateUrl: './post-anime.component.html', 
  styleUrls: ['./post-anime.component.css']
})
export class PostAnimeComponent implements OnInit{

  anime = new FormGroup({
    name: new FormControl(''),
    typeId: new FormControl(''),
    studioId: new FormControl(''),
    episode: new FormControl(''),
    genre: new FormArray([]),
    imgUrl: new FormControl(''),
    synopsis: new FormControl('')
  });

  studioOptions = [
    { id: '1', name: 'Studio 1' },
    { id: '2', name: 'Studio 2' },
    { id: '3', name: 'Studio 3' },
  ];

  genreOptions = ['Action', 'Adventure', 'Drama'];

  constructor() {}

  ngOnInit(): void {}

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
}
