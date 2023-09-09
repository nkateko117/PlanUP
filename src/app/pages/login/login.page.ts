import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  showPassword: boolean = false;

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private userService : DataService, private router: Router, private tokenDecoder: TokenDecoderService,) {
    this.email = '';
    this.password = '';

    const token = localStorage.getItem('token');
    if(token)
    {
     var role = this.tokenDecoder.decodeToken(token);
     if(role == "Student")
     {
      this.router.navigate(['/admin-home']);
     }
    }
  }

  ngOnInit(): void {
  }

  login() 
  {
    if(this.email.length<1 || this.password.length<1)
    {
      alert("Your username or password cannot be empty")
    }

    else{
    const loginData = {
      emailAddress: this.email,
      password: this.password
    };
  
    this.userService.Login(loginData)
      .subscribe(
        response => {
          const token = (response as any).result as string; // Extract the token from the 'result' property
          localStorage.setItem('token', token);
          var role = this.tokenDecoder.decodeInitialToken(token);
          // Route based on the user's role
        if (role === 'Employee') 
        {
          this.router.navigate(['/employee-home']);
        } 
        
        else if (role === 'Administrator') 
        {
         // this.router.navigate(['/admin-home']);
        }
      },
        async error => {
          alert(error.error);
        }
      );
    }
  } 
}
