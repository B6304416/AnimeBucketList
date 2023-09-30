import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AnimelistComponent } from './components/animelist/animelist.component'
import { MangalistComponent } from './components/mangalist/mangalist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'animelist', component: AnimelistComponent },
  { path: 'mangalist', component: MangalistComponent },
  { path: '', redirectTo: '/animelist', pathMatch: 'full' }, // Redirect to the login page by default
  { path: '', redirectTo: '/mangalist', pathMatch: 'full' }, // Redirect to the login page by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
