import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FromAnimeComponent } from '../child/from-anime/from-anime.component';
import { FromMangaComponent } from '../child/from-manga/from-manga.component';

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

interface UserResponse {
  _id: string;
  name: string;
  favCharacter: string;
}

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css']
})

export class CharacterlistComponent implements OnInit {
  @ViewChild('fromAnimeComponent') fromAnimeComponent!: FromAnimeComponent;
  @ViewChild('fromMangaComponent') fromMangaComponent!: FromMangaComponent;

  fromAnimeId: string|null = null
  fromMangaId: string|null = null
  characters: CharacterResponse[] = [];
  sortedCharacters: CharacterResponse[] = [];
  currentUser: UserResponse[] = [];
  showFullDetail: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }
  
  baseUrl: string = 'http://localhost:5555';

  ngOnInit(): void {
    this.fetchData()
  }

  // favChar = sessionStorage.getItem('favCharacter');
  userId = sessionStorage.getItem('userId');

  fetchData(){
    console.log('user',this.userId)
    const url = 'http://localhost:5555/character/detail/';
    this.http.get<CharacterResponse[]>(url).subscribe(
      (res) => {
        const sortedRes = res.sort((a, b) => b.score - a.score);
        this.sortedCharacters = sortedRes
        this.sortedCharacters = res.map(character => ({
          ...character,
          imgProfile: this.baseUrl + character.imgProfile
        }));
        if(this.sortedCharacters[0].animeId){
          this.fromAnimeId = this.sortedCharacters[0].animeId
          console.log('character1 ',this.sortedCharacters[0].name)
        }
        if(this.sortedCharacters[0].mangaId){
          this.fromMangaId = this.sortedCharacters[0].mangaId
        }
        this.fromAnimeComponent.fetchData();
        this.fromMangaComponent.fetchData();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    if(this.userId){
      const userUrl = 'http://localhost:5555/user_info/'+this.userId;
      console.log('userUrl ',userUrl)
      this.http.get<UserResponse[]>(userUrl).subscribe(
        (res) => {
          this.currentUser = res 
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

  }

  onLike(characterId: string, characterName: string) {
    console.log('Clicked on anime with ID:', characterId);
    const likeUrl = 'http://localhost:5555/character/like/'+characterId;
    console.log('URL:', likeUrl);

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.get(likeUrl, { headers }).subscribe(
      (response) => {
        console.log('Anime posted successfully', response);
        this.showAlertMessage('Your favorite character is '+characterName,true)
        this.fetchData()
      },
      (error) => {
        console.error('Error', error);
        this.showAlertMessage('Error: ' + error.message, false)
      }
    );

  }
  

  showAlert: boolean = false; 
  alertMessage: string = "alert—check it out!";
  alertClass: string = ''; // ตัวแปรสำหรับกำหนดคลาส CSS ของ alert

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.alertClass = isSuccess ? 'alert alert-success' : 'alert alert-warning';
    this.showAlert = true; // แสดง alert
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
