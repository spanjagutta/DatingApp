import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:5001/api/";
  private currentUserSouce = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSouce.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSouce.next(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSouce.next(user);          
        }
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSouce.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSouce.next(null!);
  }
}
