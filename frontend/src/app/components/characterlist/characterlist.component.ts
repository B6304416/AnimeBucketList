import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';
declare var window: any;

interface CharacterResponse {
  _id: string;
  name: string;
  score: number;
  imgProfile: string;
  anime: string;
  manga: string;
  detail: string;
}

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css']
})

export class CharacterlistComponent implements OnInit {

  characters: CharacterResponse[] = [];
  sortedCharacters: CharacterResponse[] = [];

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }
  
  baseUrl: string = 'http://localhost:5555';

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/character/detail';
    this.http.get<CharacterResponse[]>(url).subscribe(
      (res) => {
        console.log(this.characters)
        const sortedRes = res.sort((a, b) => b.score - a.score);
        this.sortedCharacters = sortedRes
        this.sortedCharacters = res.map(character => ({
          ...character,
          imgProfile: this.baseUrl + character.imgProfile
        }));
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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
        // window.location.reload();
      },
      (error) => {
        console.error('Error posting anime', error);
        this.showAlertMessage('Error: ' + error.message,false)
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
