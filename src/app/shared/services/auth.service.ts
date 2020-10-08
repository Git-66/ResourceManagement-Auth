import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = "http://localhost:8080/";
  constructor(private http: HttpClient) { 
  }

  login (model: any) {
    return this.http.post(this.authUrl + 'login', model).pipe(
      map((response: any) => {          
        const user = response;
        // console.log(user);
        if (user.jwt != null) {
          console.log("user.result.succeeded")
          localStorage.setItem('token', user.jwt);
        }
      })
    );
  }

  register(username: string, password: string) {
    // console.log(username);
    // console.log(password);
    const user: User ={username, password, user: {} };
    return this.http.post(this.authUrl + 'signup', user);
  }

}
