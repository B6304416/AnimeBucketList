// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isLoginPageSubject = new BehaviorSubject<boolean>(false);
  isLoginPage$ = this.isLoginPageSubject.asObservable();

  setIsLoginPage(value: boolean) {
    this.isLoginPageSubject.next(value);
  }
}
