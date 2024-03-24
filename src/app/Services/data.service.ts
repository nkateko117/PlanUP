import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserVM, LoginVM } from '../Models/user';
import { StudentModule, Activity } from '../Models/course';
import { Observable } from 'rxjs';
import { TokenDecoderService } from '../Authentication/token-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl= 'https://localhost:7191/api/';
  //apiUrl= 'https://planup.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient, private TokenDec : TokenDecoderService,
    private router: Router) { }

  Register(user: UserVM): Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}Authentication/Register`, user);
  }

  Login(user: LoginVM): Observable<string> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}Authentication/Login`, user)
    .pipe(
      map(response => response.token)
    );
  }

  logout(): Observable<any> {
    const token: any = localStorage.getItem('token');
    if(!this.TokenDec.checkTokenExp(token))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    return this.httpClient.post<any>(`${this.apiUrl}Authentication/Logout`, null);
  }

  GetStudentModule(ID: string): Observable<StudentModule[]> {
    return this.httpClient.get<StudentModule[]>(`${this.apiUrl}Course/GetStudentModules/${ID}`);
  }
  
  GetActivities(ID: string): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.apiUrl}Course/GetActivities/${ID}`);
  }

  AddModule(module : StudentModule): Observable<string> {
    return this.httpClient.post<{message: string}>(`${this.apiUrl}Course/AddModule`, module)
    .pipe(
      map(response => response.message)
    );
  }

  AddActivity(activity : Activity): Observable<string> {
    return this.httpClient.post<{message: string}>(`${this.apiUrl}Course/AddActivity`, activity)
    .pipe(
      map(response => response.message)
    );
  }

  UpdateActivity(activity : Activity): Observable<string> {
    var id = activity.activityID;
    return this.httpClient.put<{message: string}>(`${this.apiUrl}Course/UpdateActivity/${id}`, activity)
    .pipe(
      map(response => response.message)
    );
  }

  UpdateModule(module : StudentModule): Observable<string> {
    var id = module.moduleID;
    return this.httpClient.put<{message: string}>(`${this.apiUrl}Course/UpdateModule/${id}`, module)
    .pipe(
      map(response => response.message)
    );
  }

  DeleteModule(id : number): Observable<string>{
    return this.httpClient.delete<{message: string}>(`${this.apiUrl}Course/DeleteModule/${id}`)
    .pipe(
      map(response => response.message)
    );
  }

  DeleteActivity(id : number): Observable<string>{
    return this.httpClient.delete<{message: string}>(`${this.apiUrl}Course/DeleteActivity/${id}`)
    .pipe(
      map(response => response.message)
    );
  }
}
