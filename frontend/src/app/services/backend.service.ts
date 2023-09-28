import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  fetchData(){
    const url = 'http://localhost:5555';
    return this.http.get(url);
  }
}
