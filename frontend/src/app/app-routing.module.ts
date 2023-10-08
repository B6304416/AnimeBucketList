import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AnimelistComponent } from './components/list-anime/animelist.component'
import { PostAnimeComponent } from './components/post-anime/post-anime.component';
import { MangalistComponent } from './components/list-manga/mangalist.component';
import { AnimereviewComponent } from './components/review-anime/animereview.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AnimetableComponent } from './components/table-anime/animetable.component';
import { UpdateAnimeComponent } from './components/update-anime/update-anime.component';
import { TableCharacterComponent } from './components/table-character/table-character.component';
import { PostCharacterComponent } from './components/post-character/post-character.component';
import { PostMangaComponent } from './components/post-manga/post-manga.component';
import { CharacterlistComponent } from './components/list-character/characterlist.component';
import { MangareviewComponent } from './components/review-manga/mangareview.component';
import { MangatableComponent } from './components/table-manga/mangatable.component';
import { UpdateCharacterComponent } from './components/update-character/update-character.component';
import { UpdateMangaComponent } from './components/update-manga/update-manga.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'listanime', component: AnimelistComponent },
  { path: 'listmanga', component: MangalistComponent },
  { path: 'listcharacter', component: CharacterlistComponent },
  { path: 'tableanime', component: AnimetableComponent },
  { path: 'tablemanga', component: MangatableComponent },
  { path: 'tablecharacter', component: TableCharacterComponent },
  { path: 'postanime', component: PostAnimeComponent },
  { path: 'postmanga', component: PostMangaComponent },
  { path: 'postcharacter', component: PostCharacterComponent },
  { path: 'animereview/:id', component: AnimereviewComponent },
  { path: 'mangareview/:id', component: MangareviewComponent },
  { path: 'updateanime/:id', component: UpdateAnimeComponent },
  { path: 'updatemanga/:id', component: UpdateMangaComponent },
  { path: 'updatecharacter/:id', component: UpdateCharacterComponent },
  { path: '', redirectTo: '/listanime', pathMatch: 'full' }, // Redirect to the login page by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
