import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    userId: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    loginName: '',
    password: '',
    role: 'Donor',
    panNumber: ''
  }

  constructor(private userService: UserService) {}

  handleRegistration(form: NgForm) {
    console.log("registration: ", form)
    console.log("user: ", this.userService.registerUser(this.user))
  }
}
