import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface BookResponse {
  count: number;
  data: {
    title: string;
    author: string;
    publishYear: number;
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data!: string[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const url = 'http://localhost:5555/book';
    
    // Replace 'YOUR_TOKEN' with your actual token
    const token = sessionStorage.getItem('token');;
  
    // Set up headers with the token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    this.http.get<BookResponse>(url, { headers }).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res.data.map(item => item.title);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
