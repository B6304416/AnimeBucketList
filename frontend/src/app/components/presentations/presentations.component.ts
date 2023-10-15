import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit{

  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
      this.sharedDataService.setIsLoginPage(true);
  }

  
}
