// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// interface MangaResponse {
//   name: string;
//   authorId: string;
//   genre: string;
//   imgUrl:string;
// }

// @Component({
//   selector: 'app-mangalist',
//   templateUrl: './mangalist.component.html',
//   styleUrls: ['./mangalist.component.css']
// })

// export class MangalistComponent implements OnInit {

//   // data!: string;
//   data: MangaResponse[] = [];

//   constructor(private http: HttpClient, private router: Router) {
//   }

//   ngOnInit(): void {
//     const url = 'http://localhost:5555/manga';
//     this.http.get<MangaResponse[]>(url).subscribe(
//       (res) => {
//         console.log('Response data:', res);
//         this.data = res
//         console.log(this.data)
//         this.addNewPost();
//       },
//       (error) => {
//         console.error('Error:', error);
//       }
//     );

//   }

//   // Function to create a new card element
//   createCard(data: MangaResponse): HTMLElement {
//     console.log("data")
//     const card = document.createElement("div");
//     card.className = "col-lg-4";
//     card.innerHTML = `
//         <div class="card mb-4">
//             <a href="#!"><img class="card-img-top" src="${data.imgUrl}" alt="..." /></a>
//             <div class="card-body">
//             <div class="small text-muted">${data.genre}</div>
//             <h2 class="card-title h4">${data.name}</h2>
//             <p class="card-text">${data.authorId} author</p>
//                 <a class="btn btn-primary" href="#!">Read more →</a>
//             </div>
//         </div>
//     `;
//     return card;
//   }

//   addNewPost(): void {
//     const MangaResponse = document.getElementById("card-anime");
//     if (MangaResponse) {
//       this.data.forEach((item) => {
//         const newCard = this.createCard(item);
//         MangaResponse.appendChild(newCard);
//       })
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SharedDataService } from 'src/app/services/shared-data.service';
declare var window: any;

interface MangaResponse {
  _id: string;
  name: string;
  episode: number;
  genre: string;
  imgUrl: string;
}

interface PopCharacterResponse {
  name: string;
  score: number;
  imgUrl: string;
}

@Component({
  selector: 'app-mangalist',
  templateUrl: './mangalist.component.html',
  styleUrls: ['./mangalist.component.css']
})

export class MangalistComponent implements OnInit {

  data: MangaResponse[] = [];
  popCharacter: PopCharacterResponse[] = [];

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sharedDataService.setIsLoginPage(false);
    const url = 'http://localhost:5555/manga';
    this.http.get<MangaResponse[]>(url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res
        console.log(this.data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    const char_url = 'http://localhost:5555/character/popular';
    this.http.get<PopCharacterResponse[]>(char_url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.popCharacter = res
        console.log(this.popCharacter)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onClick(animeId: string) {
    console.log('Clicked on anime with ID:', animeId);
    this.router.navigate(['/animereview', animeId]);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // เลื่อนไปที่ด้านบนสุดของหน้าเว็บ
    window.scrollTo(0, 0); // กระโดดไปที่ด้านบนสุดของหน้าเว็บทันที
  }
  
}
