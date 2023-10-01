import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit {
  showOriginalImage = true;

  onInputChange() {
    if (this.signupUser.get('name')?.value && this.signupUser.get('email')?.value && this.signupUser.get('password')?.value) {
      this.showOriginalImage = false;
    } else {
      this.showOriginalImage = true;
    }
  }

  
  signupUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4,}$/) // ต้องมีตัวเลขอย่างน้อย 4 ตัวขึ้นไป
    ])
  });

  role: number = 2;
  favCharacter = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    // เรียกใช้ Service เพื่อกำหนดค่า
    this.sharedDataService.setIsLoginPage(true);
  }

  onSubmit() {
    
    const data = {
      email: this.signupUser.get('email')?.value,
      password: this.signupUser.get('password')?.value,
      name: this.signupUser.get('name')?.value,
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
