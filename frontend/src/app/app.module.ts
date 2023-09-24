import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';


import { AppRoutingModule } from './app-routing.module'; // นำเข้า AppRoutingModule
import { RouterModule } from '@angular/router'; // นำเข้า RouterModule

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
