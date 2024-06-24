import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://prueba.sandboxmb.com/api';  // Endpoint base

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  convertToSeller(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/convert-to-seller`, data);
  }

  // Otros métodos de API...
}
