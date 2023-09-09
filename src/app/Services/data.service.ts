import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl= 'https://localhost:7161/api/'; 
  constructor(private httpClient: HttpClient) { }
}
