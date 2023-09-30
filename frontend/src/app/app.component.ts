import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoginPage: boolean = false; 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    // window.addEventListener('beforeunload', function (event) {
    //   // Clear localStorage
    //   localStorage.clear();
    // });

    const token = sessionStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    } else {
      console.log('User is logged in with userId:', token);
    }
  }



}
