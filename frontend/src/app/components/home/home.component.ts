import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface CharacterResponse {
  name: string;
  score: number;
  imgProfile: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  selectedFile: File | null = null;
  
  constructor(private http: HttpClient) { }
  
  baseUrl: string = 'http://localhost:5555'; // Replace with your actual server URL

  ngOnInit(): void {
    const url = 'http://localhost:5555/character/';
    this.http.get<CharacterResponse[]>(url).subscribe(
      (res) => {
        this.characters = res.map(character => ({
          ...character,
          imgProfile: this.baseUrl + character.imgProfile
        }));
        console.log(this.characters);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      // Perform the upload using HttpClient
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      console.log(formData)
      // Replace 'http://localhost:5555/upload' with your actual upload endpoint
      this.http.post('http://localhost:5555/upload', formData)
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully', response);
            // Refresh the list of characters or perform any other action
          },
          (error) => {
            console.error('Error uploading image', error);
          }
        );
    }
  }

}
