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
import { AnimelistComponent } from './components/list-anime/animelist.component';
import { PostAnimeComponent } from './components/post-anime/post-anime.component'
import { SharedDataService } from './services/shared-data.service';
import { AnimereviewComponent } from './components/review-anime/animereview.component';
import { PostMangaComponent } from './components/post-manga/post-manga.component';
import { MangalistComponent } from './components/list-manga/mangalist.component';
import { AnimetableComponent } from './components/table-anime/animetable.component';
import { UpdateAnimeComponent } from './components/update-anime/update-anime.component';
import { PostCharacterComponent } from './components/post-character/post-character.component';
import { CharacterlistComponent } from './components/list-character/characterlist.component';
import { MangareviewComponent } from './components/review-manga/mangareview.component';
import { FromAnimeComponent } from './components/child/from-anime/from-anime.component';
import { FromMangaComponent } from './components/child/from-manga/from-manga.component';
import { TableCharacterComponent } from './components/table-character/table-character.component';
import { MangatableComponent } from './components/table-manga/mangatable.component';
import { UpdateCharacterComponent } from './components/update-character/update-character.component';

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
    PostMangaComponent,
    MangalistComponent,
    AnimetableComponent,
    UpdateAnimeComponent,
    PostCharacterComponent,
    CharacterlistComponent,
    MangareviewComponent,
    FromAnimeComponent,
    FromMangaComponent,
    TableCharacterComponent,
    MangatableComponent,
    UpdateCharacterComponent,

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
