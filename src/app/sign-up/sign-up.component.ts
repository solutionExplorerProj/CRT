import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupEmail: string='';
  userName: string='';
  signupPassword: string='';
  confirmPassword: string='';
  signupPasswordFieldType: string = 'password';

  constructor(private userService: UserService,private router: Router) { }

  onSignup() {
    const user: User = {
      userName: this.userName,
      password: this.signupPassword,
      reEnterPassword: this.confirmPassword,
      emailid: this.signupEmail
    };

    this.userService.register(user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  toggleSignupPasswordVisibility() {
    this.signupPasswordFieldType = this.signupPasswordFieldType === 'password' ? 'text' : 'password';
  }

}
