import { Component, OnInit } from '@angular/core';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { StudentModule } from 'src/app/Models/course';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }

  ngOnInit() {
    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MGViYTZlZC0xNzIwLTRmZDAtYWM2YS01MGI5Mjg2NzNiOGYiLCJ1bmlxdWVfbmFtZSI6Im5rYXRla28ubWFsdWxla2UwM0BnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJOa2F0ZWtvIiwiTGFzdE5hbWUiOiJNYWx1bGVrZSIsIm5iZiI6MTY5NDM2MDg0MSwiZXhwIjoxNjk0MzcxNjQwLCJpYXQiOjE2OTQzNjA4NDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxOTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5MS8ifQ.1-nTlAhGfzRyo_ynEG6C4GaKo0omE2NCJZCjgkXDBh0');
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.userID=userID;
      //alert(userID);
      this.GetStudentModules(userID);
  }

  token! : any;
  Modules : StudentModule [] = [];
  newModule : StudentModule = new StudentModule;
  presentingElement : any;
  userID! : string;

  GetStudentModules(ID : string): void {
    this.userService.GetStudentModule(ID).subscribe(
      (modules: StudentModule[])=>{
        this.Modules=modules;
        localStorage.setItem('Modules', JSON.stringify(modules));

      },
      (error)=>{
        //alert('Error retrieving student modules: '+ error.error)
      });
  }

  AddModule(): void {
    if(this.newModule.moduleName.length<1){
      alert('Module Name is required');
    }
    else{
    this.newModule.userID = this.userID;
    this.userService.AddModule(this.newModule).subscribe(
      ()=>{
        alert('Module Added successfully');
      },
      (error)=>{
        alert('Error adding student module: '+ error.error)
      });
    }
  }
}
