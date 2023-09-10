import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  firstName! : string;
  lastName! : string;
  newEmail! : string;
  newPassword! : string;

  showPassword: boolean = false;
  presentingElement : any;

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
      //this.router.navigate(['/admin-home']);
     }
    }
  }

  ngOnInit(): void {
    this.presentingElement = document.querySelector('.ion-page');
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MGViYTZlZC0xNzIwLTRmZDAtYWM2YS01MGI5Mjg2NzNiOGYiLCJ1bmlxdWVfbmFtZSI6Im5rYXRla28ubWFsdWxla2UwM0BnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJOa2F0ZWtvIiwiTGFzdE5hbWUiOiJNYWx1bGVrZSIsIm5iZiI6MTY5NDM2MDg0MSwiZXhwIjoxNjk0MzcxNjQwLCJpYXQiOjE2OTQzNjA4NDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxOTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5MS8ifQ.1-nTlAhGfzRyo_ynEG6C4GaKo0omE2NCJZCjgkXDBh0');
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
         this.router.navigate(['tabs']);
      },
        async error => {
          alert(error.error.message);
        }
      );
    }
  } 

  register()
  {
    if(this.newEmail.length<1 || this.newPassword.length<1 || this.firstName.length<1 || this.lastName.length<1)
    {
      alert("Please fill in all the required fields")
    }

    else if(this.newPassword.length<10)
    {
      alert("Your password should at least be 10 characters")
    }

    else{
    const loginData = {
      firstName : this.firstName,
      lastName : this.lastName,
      email: this.newEmail,
      password: this.newPassword
    };
  
    
    this.userService.Register(loginData)
      .subscribe(
        response => {
          alert("You have been registered successfully into the system");
      },
        async error => {
          alert(error.error);
        }
      );
    }
  }
}
