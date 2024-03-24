import { Component, OnInit } from '@angular/core';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService, private router: Router) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.firstName = this.decodeToke.decodeInitialToken2(this.token).firstName;
      this.lastName = this.decodeToke.decodeInitialToken2(this.token).lastName;
      this.email = this.decodeToke.decodeInitialToken2(this.token).email;
  }

  token! : any;
  presentingElement : any;
  firstName! : string;
  lastName! : string;
  email! : string;

  logout()
  {
    this.userService.logout().subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['login']);
      },
      error => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    );
  }

  ionViewDidEnter() {
  }
}
