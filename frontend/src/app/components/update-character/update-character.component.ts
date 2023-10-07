import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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

interface AnimeResponse {
  _id: string | null;
  name: string;
}

interface MangaResponse {
  _id: string | null;
  name: string;
}

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.css']
})
export class UpdateCharacterComponent implements OnInit {

  character = new FormGroup({
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    animeId: new FormControl('', [Validators.required]),
    mangaId: new FormControl('', [Validators.required]),
    // imgProfile: new FormControl(null as File | null, [Validators.required]),
  });
  charData: CharacterResponse[] = []
  animeOptions: AnimeResponse[] = [];
  mangaOptions: MangaResponse[] = [];
  characterUrl = 'http://localhost:5555/character/';
  characterId: string | null;
  imgProfile : string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.characterId = this.route.snapshot.paramMap.get('id');
  }

  selectedFile: File | null = null;
  profile?: string | ArrayBuffer | null = null;


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profile = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    const animeUrl = 'http://localhost:5555/anime/detail/';
    this.http.get<AnimeResponse[]>(animeUrl).subscribe(
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

    const role = sessionStorage.getItem('role');
    if (role !== "1") {
      this.router.navigate(['/login']);
    } else {
      console.log('Users cannot access the admin section.');
    };

    //get amime detail
    if (this.characterId !== null) {
      const characterUrlbyId = `${this.characterUrl}${this.characterId}`;
      this.http.get<CharacterResponse[]>(characterUrlbyId).subscribe(
        (res) => {
          this.charData = res;
          const charResponse = this.charData[0];
          this.imgProfile = 'http://localhost:5555'+this.charData[0].imgProfile
          this.character.patchValue({
            name: charResponse.name,
            animeId: charResponse.animeId,
            mangaId: charResponse.mangaId,
            detail: charResponse.detail,
          });
          console.log('charData',this.charData);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Anime ID is null.');
    }
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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const characterId = this.characterId; 
    if(charData.animeId == 'null'){
      charData.animeId = null
    }
    if(charData.mangaId == 'null'){
      charData.mangaId = null
    }
    this.http.put(`http://localhost:5555/character/${characterId}`, charData, { headers, responseType: 'text' as 'json' }).subscribe(
      (response) => {
        console.log('Charcter updated successfully', response);
        this.showAlertMessage('Update successfully',true)
      },
      (error) => {
        console.error('Error updating character', error);
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
    this.showAlert = true; 
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
