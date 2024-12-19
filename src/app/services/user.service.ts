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

  registerUser(user: User): void {
    this.setUserData(user).subscribe({
      next: (response: void) => {
        console.log("user registered successfully")
      }, 
      error: (error: Error) => {
        console.log("error: " + JSON.stringify(error))
      }
    })
  }

  loginUser(loginUser: LoginUser): void {
    console.log("UserService -> loginUser")
    console.log("loginUser: ", loginUser)
    this.getUserData(loginUser).subscribe({
      next: (response: User) => {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response));
        this.user.set(response)
      },
      error: (error: Error) => {
        console.log("error: " + JSON.stringify(error));
      }
    })
  }

  logoutUser(): void {
    localStorage.removeItem('user'); // Removes the user object
    this.user.set({
      userId: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      loginName: '',
      password: '',
      role: '',
      panNumber: ''
    })
  }

  // getUserData(loginUser: LoginUser): Observable<User> {
  //   console.log("loginuser: ", loginUser)
  //   return this.http.post<User>(`${this.url}`, {
  //     name: "Akash",
  //     phone: "8478372817",
  //     email: "akash@gmail.com",
  //     address: "Hyderabad",
  //     loginName: "akash",
  //     password: "Akash@123",
  //     role: "Donor",
  //     panNumber: "HFDUI7362Q"
  //   });
  // }

  getUserData(loginUser: LoginUser): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, loginUser)
  }
  setUserData(user: User): Observable<void> {
    console.log("registered user: ", user) 
    return this.http.post<void>(`${this.url}`, {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      loginName: user.loginName,
      password: user.password,
      role: user.role,
      panNumber: user.panNumber
    });
  }

  getUser(): User {
    console.log("inside getuser")
    console.log(this.user)
    return this.user();
  }

}
