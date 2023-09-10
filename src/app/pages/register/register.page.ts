import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private userService : DataService, private router: Router, private tokenDecoder: TokenDecoderService,) { }

  firstName! : string;
  lastName! : string;
  email! : string;
  passWord! : string;
  
  ngOnInit() {
  }

}
