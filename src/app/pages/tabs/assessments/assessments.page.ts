import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Activity, StudentModule } from 'src/app/Models/course';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.page.html',
  styleUrls: ['./assessments.page.scss'],
})
export class AssessmentsPage implements OnInit {

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
  results : any;

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
        this.results = activities;
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
      if(this.newActivity.color==null)
      {
        this.newActivity.color='primary';
      }

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

  handleChange(event : Event | any) {
    const query = event.target.value.toLowerCase();
    var name; var type;
     name = this.Activities.filter((d) => d.activityName.toLowerCase().indexOf(query) > -1);
     type = this.Activities.filter((d) => d.activityType.toLowerCase().indexOf(query) > -1);
    
     if(name)
     {
      this.results = name;
     }
     else
     {
      this.results = type;
     }
  }

}
