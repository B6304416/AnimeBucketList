import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit, DoCheck {
  showOriginalImage = true;

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
  
  ngDoCheck(): void {
    this.showOriginalImage = !this.signupUser.valid;
  }

  ngOnInit() {
    // เรียกใช้ Service เพื่อกำหนดค่า
    this.sharedDataService.setIsLoginPage(true);
  }

  onSubmit() {
    console.log(this.signupUser.valid)
    const data = {
      email: this.signupUser.get('email')?.value,
      password: this.signupUser.get('password')?.value,
      name: this.signupUser.get('name')?.value,
      role: 2,
      favCharacter: null
    };
    console.log(data)
    
    if (this.signupUser.get('name')?.hasError('required')) {
      this.showAlertMessage('Please enter your name.', false);
      return;
    } else if (this.signupUser.get('email')?.hasError('required')) {
      this.showAlertMessage('Please enter your email address.', false);
      return;
    } else if (this.signupUser.get('email')?.hasError('email')) {
      this.showAlertMessage('Please enter a valid email address.', false);
      return;
    } else if (this.signupUser.get('password')?.hasError('pattern')) {
      this.showAlertMessage('There must be at least 4 digits (0-9).', false);
      return;
    } else if (this.signupUser.get('password')?.hasError('required')) {
      this.showAlertMessage('Please enter a password.', false);
      return;
    } else {
    }
    

    
    this.http.post('http://localhost:5555/signup', data)
      .subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('signup error', error);
          if (error.error && error.error.message && error.error.message.includes('duplicate key error')) {
            // เมื่อเจอข้อผิดพลาดที่คีย์ซ้ำกันใน MongoDB
            this.showAlertMessage('Email is already registered.', false);
          } else {
            // กรณีอื่น ๆ ของข้อผิดพลาด
            this.showAlertMessage('signup error', false);
          }
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
