import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module'; // นำเข้า AppRoutingModule
import { RouterModule } from '@angular/router';
import { AnimelistComponent } from './animelist/animelist.component'; // นำเข้า RouterModule

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AnimelistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
