import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenDecoderService {

  constructor() { }

  decodeInitialToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    const userRole: string = decodedToken.role;
    var user= {
      firstName: decodedToken.FirstName,
      lastName: decodedToken.LastName,
      userRole : decodedToken.role,
      email : decodedToken.name
    }
    localStorage.setItem('user', JSON.stringify(user));

    return userRole;
    // Use the userRole as needed
  }

  decodeInitialToken2(token: string): any {
    const decodedToken: any = jwtDecode(token);
    const userRole: string = decodedToken.role;
    var user= {
      firstName: decodedToken.FirstName,
      lastName: decodedToken.LastName,
      userRole : decodedToken.role,
      email : decodedToken.unique_name,
      userId : decodedToken.nameid
    }
    localStorage.setItem('user', JSON.stringify(user));

    return user;
    // Use the userRole as needed
  }

  decodeToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    const userRole: string = decodedToken.role;
    return userRole;
    // Use the userRole as needed
  }

  decodeEmailToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    const email: string = decodedToken.name;
    return email;
    // Use the userRole as needed
  }

  checkTokenExp(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
}
