import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface MangaResponse {
  name: string;
  authorId: string;
  genre: string;
  imgUrl:string;
}

@Component({
  selector: 'app-mangalist',
  templateUrl: './mangalist.component.html',
  styleUrls: ['./mangalist.component.css']
})

export class MangalistComponent implements OnInit {

  // data!: string;
  data: MangaResponse[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    const url = 'http://localhost:5555/manga';
    this.http.get<MangaResponse[]>(url).subscribe(
      (res) => {
        console.log('Response data:', res);
        this.data = res
        console.log(this.data)
        this.addNewPost();
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  // Function to create a new card element
  createCard(data: MangaResponse): HTMLElement {
    console.log("data")
    const card = document.createElement("div");
    card.className = "col-lg-4";
    card.innerHTML = `
        <div class="card mb-4">
            <a href="#!"><img class="card-img-top" src="${data.imgUrl}" alt="..." /></a>
            <div class="card-body">
            <div class="small text-muted">${data.genre}</div>
            <h2 class="card-title h4">${data.name}</h2>
            <p class="card-text">${data.authorId} author</p>
                <a class="btn btn-primary" href="#!">Read more →</a>
            </div>
        </div>
    `;
    return card;
  }

  addNewPost(): void {
    const MangaResponse = document.getElementById("card-anime");
    if (MangaResponse) {
      this.data.forEach((item) => {
        const newCard = this.createCard(item);
        MangaResponse.appendChild(newCard);
      })
    }
  }
}
