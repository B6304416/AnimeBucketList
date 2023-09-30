import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoginPage: boolean = false; 

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    // ใช้ Service เพื่อรับข้อมูล
    this.sharedDataService.isLoginPage$.subscribe(value => {
      this.isLoginPage = value;
      // console.log(value)
    });
  }

}
