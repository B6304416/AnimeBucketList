import { Component, OnInit, DoCheck } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  isLoginPage: boolean = false;
  isLoggedIn: boolean = true;
  name: string | null = "";

  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient) { }

  ngOnInit(): void {
    // ใช้ Service เพื่อรับข้อมูล
    this.sharedDataService.isLoginPage$.subscribe(value => {
      this.isLoginPage = value;
      // console.log(value)
    });  
  }
  ngDoCheck(): void {
    const LoggedIn = localStorage.getItem('isLoggedIn');
    this.name = sessionStorage.getItem('username');
    // ตรวจสอบค่า isLoggedIn
    if (LoggedIn === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  checkUserRole(): boolean {
    const role = sessionStorage.getItem('role');
    if (role === '1') {
      return true;
    } else {
      return false;
    }
    

  }

  logout(): void {
    // ดำเนินการลบข้อมูลที่เก็บใน localStorage ที่เกี่ยวข้องกับการเข้าสู่ระบบ
    // และอื่น ๆ ตามที่คุณต้องการ
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('username');
    console.log(this.isLoggedIn)
    // อัปเดตค่า isLoggedIn เป็น false ใน Local Storage
    localStorage.setItem('isLoggedIn', 'false');
    // this.checkForLoginChange();
  }


}
