import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('modal2', { static: true }) modal2!: IonModal;
  @ViewChild('modal', { static: true }) modal!: IonModal;

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
  }

  ngOnInit(): void {
    this.presentingElement = document.querySelector('.ion-page');
    const token = localStorage.getItem('token');
    if(token)
    {
      this.router.navigate(['tabs/calendar']);
    }
  }

  login() 
  {
    if(this.email.length<1 || this.password.length<1)
    {
      //alert("Your username or password cannot be empty")
      this.message = "Your username or password cannot be empty";
      this.setOpen(true);
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
         this.router.navigate(['tabs/calendar']);
         this.refreshPage();
      },
        async error => {
          this.message = error.error;
        this.setOpen(true);
        }
      );
    }
  } 

  register()
  {
    if(this.newEmail.length<1 || this.newPassword.length<1 || this.firstName.length<1 || this.lastName.length<1)
    {
      //alert("Please fill in all the required fields")
      this.message = "Please fill in all the required fields";
      this.setOpen(true);
    }

    else if(this.newPassword.length<10)
    {
      //alert("Your password should at least be 10 characters")
      this.message = "Your password should at least be 10 characters";
      this.setOpen(true);
    }

    else{
    const registerData = {
      firstName : this.firstName,
      lastName : this.lastName,
      email: this.newEmail,
      password: this.newPassword
    };
  
    
    this.userService.Register(registerData)
      .subscribe(
       async response => {
          //alert("You have been registered successfully into the system");
          this.message = "You have been registered successfully into the system";
      await this.setOpen(true);
      //this.refreshPage();
      this.modal.dismiss();
      //this.refreshPage();
      //this.presentingElement.close();
      },
        async error => {
          this.message = "You have been registered successfully into the system";
      this.setOpen(true);
        }
      );
    }
  }

  resetPassword()
  {
    this.message = "A password reset link has been sent to your email";
      this.setOpen(true);
      //this.refreshPage();
      //this.presentingElement.close();
      //this.router.navigate(['login']);
      this.modal2.dismiss();
  }

  refreshPage(): void {
    window.location.reload();
  }

  message! : string;
  isToastOpen = false;
  top = 'top';
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
    if(isOpen==true)
    {
      this.refreshPage();
    }
  }
}
