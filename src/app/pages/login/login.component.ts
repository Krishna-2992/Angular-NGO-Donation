import { Component } from '@angular/core';
import { LoginUser } from '../../interfaces/login-user';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { JsonPipe, NgLocaleLocalization } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, JsonPipe, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUser: LoginUser = {
    loginName: "", 
    password: ""
  }
  
  constructor(private userService: UserService, private router: Router) { }

  handleLogin(form: NgForm) {
    console.log("inside handle login")
    if(form.valid) {
      this.userService.loginUser(this.loginUser)
      this.router.navigate(['/userDashboard']);
    }
  }

}
