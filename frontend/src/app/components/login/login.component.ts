import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data!: string[];
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(true);
  }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    console.log(credentials)
    this.http.post('http://localhost:5555/login', credentials)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.userRole);
          // sessionStorage.setItem('refresh', 'true');
          sessionStorage.setItem('username', response.userName);
          sessionStorage.setItem('favCharacter', response.favCharacter);
          console.log('Login successful', response);
          this.router.navigate(['/listanime']);
          this.sharedDataService.setIsLoginPage(false);
        },
        (error) => {
          console.error('Login error', error);
        }
      );
  }
    
  showAlert: boolean = false;
  alertMessage: string = "alert—check it out!";
  alertClass: string = ''; // ตัวแปรสำหรับกำหนดคลาส CSS ของ alert

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.alertClass = isSuccess ? 'alert alert-success' : 'alert alert-danger';
    this.showAlert = true; // แสดง alert
    // หลังจาก 3 วินาที ซ่อน alert ลง
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
