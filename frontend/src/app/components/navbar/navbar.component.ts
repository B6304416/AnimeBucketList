import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userRole: string | undefined;
  isLoginPage: boolean = false;

  constructor(
    private sharedDataService: SharedDataService, 
    private http: HttpClient) {}

  ngOnInit(): void {
    // ใช้ Service เพื่อรับข้อมูล
    this.sharedDataService.isLoginPage$.subscribe(value => {
      this.isLoginPage = value;
      // console.log(value)
    });
  }
  checkUserRole(): boolean {
    const role = sessionStorage.getItem('role');
    
    if (role === '1') {
      return true;
    } else {
      return false;
    }
  }

}
