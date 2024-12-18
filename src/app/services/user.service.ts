import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginUser } from '../interfaces/login-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = signal<User>({
    userId: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    loginName: '',
    password: '',
    role: '',
    panNumber: ''
  });
  
  private url = "http://localhost:8080/users"

  constructor(private http: HttpClient) { 
    console.log("inside user service")
  }

  loginUser(loginUser: LoginUser): void {
    console.log("UserService -> loginUser")
    this.getUserData(loginUser).subscribe({
      next: (response: User) => {
        console.log(response)
        // localStorage.setItem("user", JSON.stringify(response));
        this.user.set(response)
      },
      error: (error: Error) => {
        console.log("error: " + JSON.stringify(error));
      }
    })
  }

  getUserData(loginUser: LoginUser): Observable<User> {
    console.log("loginuser: ", loginUser)
    return this.http.post<User>(`${this.url}/login`, loginUser );
  }

  getUser(): User {
    console.log("inside getuser")
    console.log(this.user)
    return this.user();
  }
}
