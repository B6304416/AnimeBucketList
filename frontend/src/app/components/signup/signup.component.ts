import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  showOriginalImage = true;

  onInputChange() {
    if (this.name && this.email && this.password) {
      this.showOriginalImage = false;
    }
    else {
      this.showOriginalImage = true;
    }
  }
  
  name: string = ''
  email: string = '';
  password: string = '';
  role: number = 2;
  favCharacter = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    // เรียกใช้ Service เพื่อกำหนดค่า
    this.sharedDataService.setIsLoginPage(true);
  }
  

  onSubmit() {
    const data = { 
      email: this.email, 
      password: this.password,
      name: this.name,
      role: 2,
      favCharacter: null
    };

    console.log(data)
    this.http.post('http://localhost:5555/signup', data)
      .subscribe(
        (response: any) => {
          // localStorage.setItem('userId', response.userId);
          // sessionStorage.setItem('token', response.token);
          // sessionStorage.setItem('role', response.userRole);
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('signup error', error);
        }
      );
  }
}
