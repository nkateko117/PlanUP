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
      this.GetStudentModules(userID);
      this.GetActivities(userID);
  }

  ionViewDidEnter() {
    this.GetStudentModules(this.userID);
    this.GetActivities(this.userID);
    this.handleRefresh(event);
  }
  
  handleRefresh(event : any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.GetActivities(this.userID);
      event.target.complete();
    }, 2000);
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

  getColor(activity : Activity) : any
  {
    if(activity.grade){
    if(activity.grade>0 && activity.grade<40)
    {
      return 'danger';
    }

    else if(activity.grade>=40 && activity.grade<60)
    {
      return 'warning';
    }

    else if(activity.grade>=60 && activity.grade<=100)
    {
      return 'success';
    }
  }
  else{return 'primary'}
  }

  results : any;
  searchQuery! : string;
  handleChange() {
    const query = this.searchQuery.toLowerCase();
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