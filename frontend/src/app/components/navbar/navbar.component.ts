import { Component, OnInit, DoCheck} from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{

  shownavar: boolean = false;
  isLoggedIn: boolean = true;
  name: string | null = "";

  constructor(
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.isLoginPage$.subscribe(value => {
      this.shownavar = value;
      console.log("login oninit "+value)
    });
  }
  ngDoCheck(): void {
    const LoggedIn = sessionStorage.getItem('isLoggedIn');
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
    sessionStorage.setItem('isLoggedIn', 'false');
    // this.checkForLoginChange();
  }


}
