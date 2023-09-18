import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Activity, StudentModule } from 'src/app/Models/course';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.page.html',
  styleUrls: ['./assessments.page.scss'],
})
export class AssessmentsPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @ViewChild('modal2', { static: true }) modal2!: IonModal;

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
    //this.refreshPage();
    this.handleRefresh(event);
  }

  handleRefresh(event : any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  token! : any;
  presentingElement : any;
  userID! : string;
  Activities : Activity [] = [];
  newActivity : Activity = new Activity;
  Modules : StudentModule [] = [];
  results : any;
  selectedActivity! : Activity;

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
        this.message = "Error retrieving activities, make sure you are logged in";
      this.setOpen(true);
      }
    );
  }
  

  GetStudentModules(ID : string): void {
    this.userService.GetStudentModule(ID).subscribe(
      (modules: StudentModule[])=>{
        this.Modules=modules;
      },
      (error)=>{
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
      this.message = "Please fill all the required fields";
      this.setOpen(true);
    }
    else{
      if(this.newActivity.color==null)
      {
        this.newActivity.color='primary';
      }

    this.newActivity.userID = this.userID;
    this.userService.AddActivity(this.newActivity).subscribe(
      ()=>{
        this.GetActivities(this.userID);
        this.message = "Activity Added Successfully";
      this.setOpen(true);
      this.modal.dismiss();
      this.handleRefresh(event);
      this.newActivity=new Activity;
      },
      (error)=>{
        this.message = "Error adding Activity, try again later";
      this.setOpen(true);
      });
    }
  }

  UpdateActivity(): void {
    if(this.selectedActivity.activityName.length<1 || this.selectedActivity.activityType.length<1 || this.selectedActivity.date==null ||
      this.selectedActivity.moduleID == null){
      this.message = "Please fill all the required fields";
      this.setOpen(true);
    }
    else{
      if(this.newActivity.color==null)
      {
        this.newActivity.color='primary';
      }

    //this.newActivity.userID = this.userID;
    this.userService.UpdateActivity(this.selectedActivity).subscribe(
      ()=>{
        this.GetActivities(this.userID);
        this.message = "Activity Updated Successfully";
      this.setOpen(true);
      this.handleRefresh(event);
      this.modal2.dismiss();
      this.selectedActivity=new Activity;
      },
      (error)=>{
        this.message = "Error Updating Activity, try again later";
      this.setOpen(true);
      });
    }
  }

  DeleteActivity(): void {
    this.userService.DeleteActivity(this.selectedActivity.activityID).subscribe(
      ()=>{
        this.message = "Activity deleted successfully";
      this.setOpen(true);
      this.GetStudentModules(this.userID);
      this.modal2.dismiss();
      this.handleRefresh(event);
      this.GetActivities(this.userID);
      this.selectedActivity=new Activity;
      },
      (error)=>{
        this.message = "Error deleting activity, try again later";
      this.setOpen(true);
      });
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

  message! : string;
  isToastOpen = false;
  top = 'top';
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  selectActivity(activityID : number)
  {
    var activity = this.Activities.find(a=>a.activityID==activityID);
    if(activity){
    this.selectedActivity = activity;
    this.modal2.present();
  }
  }

}
