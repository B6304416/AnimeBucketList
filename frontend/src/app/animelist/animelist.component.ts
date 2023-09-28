import { Component } from '@angular/core';

// TypeScript interface for blog post data
interface BlogPost {
  date: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-animelist',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})
export class AnimelistComponent {

  ngOnInit() {
    // Initialize by adding all sampleData แสดงข้อมลทั้งหมดจากตาราง sampleData
    this.sampleData.forEach((data) => {
      this.addNewPost(data);
    });
  }
  

  // Function to create a new card element
  createCard(data: BlogPost): HTMLElement {
    const card = document.createElement("div");
    card.className = "col-lg-4";
    card.innerHTML = `
        <div class="card mb-4">
            <a href="#!"><img class="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..." /></a>
            <div class="card-body">
                <div class="small text-muted">${data.date}</div>
                <h2 class="card-title h4">${data.title}</h2>
                <p class="card-text">${data.text}</p>
                <a class="btn btn-primary" href="#!">Read more →</a>
            </div>
        </div>
    `;
    return card;
  }

  // Function to add a new card to the blog-posts div
  addNewPost(data: BlogPost): void {
    const blogPosts = document.getElementById("blog-posts");
    if (blogPosts) {
      const newCard = this.createCard(data);
      blogPosts.appendChild(newCard);
    }
  }
 
  // Event listener for the "Add Post" button
  addButtonClick(): void {
    // Simulated new data (you can replace this with actual data)
    // const newData: BlogPost = {
    //   date: "January 3, 2023",
    //   title: "New Post Title",
    //   text: "New content for the post."
    // };
    const newDataIndex = Math.floor(Math.random() * this.sampleData.length);
    const newData = this.sampleData[newDataIndex];
    this.addNewPost(newData);
  }

  // Initial population of blog posts using sample data
  sampleData: BlogPost[] = [
    { date: "January 1, 2023", title: "Post Title 1", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla." },
    { date: "January 2, 2023", title: "Post Title 2", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla." },
    { date: "January 3, 2023", title: "Post Title 2", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla." }
  ];

  constructor() {
    // Initialize by adding sample data
    this.sampleData.forEach((data) => {
      this.addNewPost(data);
    });
  }
}
