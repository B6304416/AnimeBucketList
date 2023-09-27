import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'; // Import LoginComponent

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // เรียกหน้าหลัก
  { path: 'login', component: LoginComponent }, // เส้นทางสำหรับหน้า Login
  // เพิ่มเส้นทางอื่น ๆ ตามความต้องการ
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
