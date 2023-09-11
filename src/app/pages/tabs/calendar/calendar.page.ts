import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Activity, StudentModule } from 'src/app/Models/course';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.userID=userID;
      this.GetStudentModules(userID);
      this.GetActivities(userID);
  }

  token! : any;
  presentingElement : any;
  userID! : string;
  Activities : Activity [] = [];
  newActivity : Activity = new Activity;
  Modules : StudentModule [] = [];

  colorArray: string[] = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark'
  ];

  GetActivities(ID: string): void {
    this.userService.GetActivities(ID).subscribe(
      (activities: Activity[]) => {
        // Sort activities by date before assigning them to this.Activities
        this.Activities = activities.sort((a, b) => (a.date > b.date ? 1 : -1));
        localStorage.setItem('Activities', JSON.stringify(this.Activities));
      },
      (error) => {
        // Handle error
      }
    );
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
        this.refreshPage();
      },
      (error)=>{
        alert('Error adding Activity: '+ error.error)
      });
    }
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorArray.length);
    return this.colorArray[randomIndex];
  }

  refreshPage(): void {
    window.location.reload();
  }

  isDueDateValid(dueDate: Date): boolean {
    const currentDate = new Date(dueDate);
    return dueDate >= currentDate; // Return true if the due date is in the future or today
  }

}
