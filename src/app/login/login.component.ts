import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string='password';

  constructor(private router: Router, private authService: UserService) {}

 
  onSubmit() {

    console.log("this onSubmit clciked")
    // Ensure userName and password are not empty
    this.authService.loginUser(this.userName, this.password).subscribe(
      token => {
        if (token) {
          // Navigate to the dashboard upon successful login
          console.log("this is success")
          this.router.navigate(['/dynamic']);
        } else {
          // Handle the case where no token is returned
          this.errorMessage = 'Login failed: No token received';
        }
      },
      error => {
        // Log the error and show an error message to the user
        console.error('Login failed', error);
        this.errorMessage = 'Login failed: ' + (error.message || 'Unknown error');
      }
    );
  }
  

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
