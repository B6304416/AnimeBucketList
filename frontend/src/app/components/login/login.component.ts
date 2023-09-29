import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AnimeResponse {
  count: number;
  data: {
    name: string;
    episode: number;
  }[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data!: string[];
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // const url = 'http://localhost:5555/anime';
    // this.http.get<AnimeResponse>(url ).subscribe(
    //   (res) => {
    //     console.log('Response data:', res);
    //     this.data = res.data.map(item => ' '+item.name+' '+ item.episode);
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    console.log(credentials)
    this.http.post('http://localhost:5555/login', credentials)
      .subscribe(
        (response: any) => {
          localStorage.setItem('userId', response.userId);
          sessionStorage.setItem('token', response.token);
          console.log('Login successful', response);
          this.router.navigate(['/animelist']);
        },
        (error) => {
          console.error('Login error', error);
        }
      );
  }
}
