import { Component, OnInit } from '@angular/core';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
//import { aW } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService, private router: Router,
    private DeviceStorage : StorageService) { }

  async ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    //this.token=localStorage.getItem('token');
    this.token = await this.DeviceStorage.getToken();
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

  async logout()
  {
    (await this.userService.logout()).subscribe(
      async response => {
      localStorage.clear();
       await this.DeviceStorage.deleteToken();       
        this.router.navigate(['login']);
      },
      async error => {
        localStorage.clear();
        await this.DeviceStorage.deleteToken();
        this.router.navigate(['login']);
      }
    );
  }

  ionViewDidEnter() {
  }
}
