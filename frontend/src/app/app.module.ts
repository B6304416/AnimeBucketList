import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { AnimelistComponent } from './components/animelist/animelist.component';
import { PostAnimeComponent } from './components/post-anime/post-anime.component'
import { SharedDataService } from './services/shared-data.service';
import { AnimereviewComponent } from './components/animereview/animereview.component';
import { ReviewComponent } from './components/review/review.component';
import { PostMangaComponent } from './components/post-manga/post-manga.component';
import { MangalistComponent } from './components/mangalist/mangalist.component';
import { AnimetableComponent } from './components/animetable/animetable.component';
<<<<<<< HEAD
import { UpdateAnimeComponent } from './components/update-anime/update-anime.component';
=======
import { PostCharacterComponent } from './components/post-character/post-character.component';
>>>>>>> 9449d368707d7cdb0d517a0b97ef7e79d3218df7

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    AnimelistComponent,
    PostAnimeComponent,
    AnimereviewComponent,
    ReviewComponent,
    PostMangaComponent,
    MangalistComponent,
    AnimetableComponent,
<<<<<<< HEAD
    UpdateAnimeComponent,
=======
    PostCharacterComponent,
>>>>>>> 9449d368707d7cdb0d517a0b97ef7e79d3218df7

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
