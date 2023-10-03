import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface StudioResponse {
  _id: string;
  name: string;
}

interface AnimeResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
  trailerUrl: string;
  synopsis: string;
  typeId: string;
  studioId: string;
  sourceId: string;
}

@Component({
  selector: 'app-update-anime',
  templateUrl: './update-anime.component.html',
  styleUrls: ['./update-anime.component.css']
})
export class UpdateAnimeComponent implements OnInit {

  anime = new FormGroup({
    name: new FormControl(''),
    typeId: new FormControl(''),
    studioId: new FormControl(''),
    episode: new FormControl(0),
    genre: new FormArray([]),
    imgUrl: new FormControl(''),
    trailerUrl: new FormControl(''),
    synopsis: new FormControl(''),
    sourceId: new FormControl('')
  });
  animeData: AnimeResponse[] = []
  studioOptions: StudioResponse[] = [];
  genreOptions: string[] = [];

  animeUrl = 'http://localhost:5555/anime/';
  animeId: string | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const studioUrl = 'http://localhost:5555/anime/studios';
    this.http.get<StudioResponse[]>(studioUrl).subscribe(
      (res) => {
        this.studioOptions = res
        console.log(this.studioOptions)
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
    if (this.animeId !== null) {
      const animeUrlbyId = `${this.animeUrl}${this.animeId}`;
      this.http.get<AnimeResponse[]>(animeUrlbyId).subscribe(
        (res) => {
          this.animeData = res;

          // นำข้อมูลที่ดึงมาใส่ใน form anime
          const animeResponse = this.animeData[0]; 

          // ตรวจสอบ genre และตั้งค่า checkbox ตาม genre ใน animeResponse.genre
          Array.from(animeResponse.genre).forEach((genre: string) => {
            this.toggleGenre(genre);
          });

          this.anime.patchValue({
            name: animeResponse.name,
            studioId: animeResponse.studioId, 
            episode: animeResponse.episode, 
            imgUrl: animeResponse.imgUrl,
            trailerUrl: animeResponse.trailerUrl,
            synopsis: animeResponse.synopsis,
            sourceId: animeResponse.sourceId,
            typeId: animeResponse.typeId,
          });


          console.log("anime");
          console.log(this.animeData);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Anime ID is null.');
    }


  }

  //ตรวจ id กับ name studio
  getStudioName(studioId: string | null | undefined): string {
    if (!studioId) {
      return 'Unknown';
    }
    const studio = this.studioOptions.find(s => s._id === studioId);
    return studio ? studio.name : 'Unknown Studio';
  }

  isValidGenre(genre: string): boolean {
    const genreArray = this.anime.get('genre') as FormArray;
    return genreArray.value.includes(genre);
  }

  toggleGenre(genre: string): void {
    const genreArray = this.anime.get('genre') as FormArray;
    if (genreArray.value.includes(genre)) {
      genreArray.removeAt(genreArray.value.indexOf(genre));
    } else {
      genreArray.push(new FormControl(genre));
    }
  }

UpdateAnime() {
  const animeData = this.anime.value;
  const token = sessionStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });

  const animeId = this.animeId; // รับค่า animeId จาก route parameter

  // ส่งค่า animeData และใช้ HTTP PUT เพื่ออัปเดต Anime ที่มี animeId ตามที่ระบุ
  this.http.put(`http://localhost:5555/anime/${animeId}`, animeData, { headers, responseType: 'text' as 'json' }).subscribe(
    (response) => {
      console.log('Anime updated successfully', response);
      alert('Anime updated successfully');
    },
    (error) => {
      console.error('Error updating anime', error);
      alert('Error: ' + error.message);
    }
  );
}

}
