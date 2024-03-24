import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() : any{
    var token = localStorage.getItem('token');
    if(token)
    return token;
  }
}
