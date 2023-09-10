import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Activity, StudentModule } from 'src/app/Models/course';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.userID=userID;
  }

  token! : any;
  presentingElement : any;
  userID! : string;
  Activities : Activity [] = [];
  newActivity : Activity = new Activity;
  Modules : StudentModule [] = [];

  GetActivities(ID : string): void {
    this.userService.GetActivities(ID).subscribe(
      (activities: Activity[])=>{
        this.Activities = activities;
        localStorage.setItem('Activities', JSON.stringify(activities));
      },
      (error)=>{
        //alert('Error retrieving student modules: '+ error.error)
      });
  }

  GetStudentModules(ID : string): void {
    this.userService.GetStudentModule(ID).subscribe(
      (modules: StudentModule[])=>{
        this.Modules=modules;
      },
      (error)=>{
        //alert('Error retrieving student modules: '+ error.error)
      });
  }

  GetModuleName(ID : number) : any
  {
    var active = this.Modules.find(a=>a.moduleID==ID)?.moduleName;
    return active;
  }

  AddActivity(): void {
    if(this.newActivity.activityName.length<1 || this.newActivity.activityType.length<1 || this.newActivity.date==null ||
      this.newActivity.moduleID == null){
      alert('Please fill all the required fields');
    }
    else{
    this.newActivity.userID = this.userID;
    this.userService.AddActivity(this.newActivity).subscribe(
      ()=>{
        alert('Activity Added successfully');
      },
      (error)=>{
        alert('Error adding Activity: '+ error.error)
      });
    }
  }

}