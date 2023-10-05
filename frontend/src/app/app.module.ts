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
import { CharecterlistComponent } from './components/charecterlist/charecterlist.component';
import { AnimetableComponent } from './components/animetable/animetable.component';
import { UpdateAnimeComponent } from './components/update-anime/update-anime.component';
import { PostCharacterComponent } from './components/post-character/post-character.component';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { MangareviewComponent } from './components/mangareview/mangareview.component';
import { FromAnimeComponent } from './components/child/from-anime/from-anime.component';
import { FromMangaComponent } from './components/child/from-manga/from-manga.component';

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
    CharecterlistComponent,
    AnimetableComponent,
    UpdateAnimeComponent,
    PostCharacterComponent,
    CharacterlistComponent,
    MangareviewComponent,
    FromAnimeComponent,
    FromMangaComponent,

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
