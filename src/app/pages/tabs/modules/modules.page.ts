import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { StudentModule, Activity } from 'src/app/Models/course';
import { DataService } from 'src/app/Services/data.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @ViewChild('modal2', { static: true }) modal2!: IonModal;

  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }

  ngOnInit() {
    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MGViYTZlZC0xNzIwLTRmZDAtYWM2YS01MGI5Mjg2NzNiOGYiLCJ1bmlxdWVfbmFtZSI6Im5rYXRla28ubWFsdWxla2UwM0BnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJOa2F0ZWtvIiwiTGFzdE5hbWUiOiJNYWx1bGVrZSIsIm5iZiI6MTY5NDM2MDg0MSwiZXhwIjoxNjk0MzcxNjQwLCJpYXQiOjE2OTQzNjA4NDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxOTEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5MS8ifQ.1-nTlAhGfzRyo_ynEG6C4GaKo0omE2NCJZCjgkXDBh0');
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.userID=userID;
      this.GetStudentModules(userID);
      this.GetActivities(userID);
      //this.refreshPage();
  }

  ionViewDidEnter() {
    this.GetStudentModules(this.userID);
    this.handleRefresh(event);
  }

  handleRefresh(event : any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.GetStudentModules(this.userID);
      event.target.complete();
    }, 2000);
  }

  token! : any;
  Modules : StudentModule [] = [];
  newModule : StudentModule = new StudentModule;
  selectedModule! : StudentModule;
  presentingElement : any;
  userID! : string;
  Activities : Activity [] = [];

  GetStudentModules(ID : string): void {
    this.userService.GetStudentModule(ID).subscribe(
      (modules: StudentModule[])=>{
        this.Modules=modules;
        localStorage.setItem('Modules', JSON.stringify(modules));
      },
      (error)=>{
        this.message = "Error retrieving student modules, make sure you are logged in";
      this.setOpen(true);
      });
  }

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

  AddModule(): void {
    if(this.newModule.moduleName.length<1){
      this.message = "Module Name is required";
      this.setOpen(true);
    }
    else{
    this.newModule.userID = this.userID;
    this.userService.AddModule(this.newModule).subscribe(
      ()=>{
        this.message = "Module Added successfully";
      this.setOpen(true);
      this.GetStudentModules(this.userID);
      this.modal.dismiss();
      this.newModule = new StudentModule;
      },
      (error)=>{
        this.message = "Error adding module, make sure you are logged in";
      this.setOpen(true);
      });
    }
  }

  UpdateModule(): void {
    if(this.selectedModule.moduleName.length<1){
      this.message = "Module Name is required";
      this.setOpen(true);
    }
    else{
    //this.newModule.userID = this.userID;
    this.userService.UpdateModule(this.selectedModule).subscribe(
      ()=>{
        this.message = "Module Updated successfully";
      this.setOpen(true);
      this.GetStudentModules(this.userID);
      this.modal2.dismiss();
      this.selectedModule = new StudentModule;
      },
      (error)=>{
        this.message = "Error updating module, try again later";
      this.setOpen(true);
      });
    }
  }

  DeleteModule(): void {
    this.GetActivities(this.userID);
    var activities = this.Activities.filter(a=>a.moduleID==this.selectedModule.moduleID);
    if(activities.length>0)
    {
      this.message = "Module has activities linked to it";
      this.setOpen(true);
      return
    }
    else{
    this.userService.DeleteModule(this.selectedModule.moduleID).subscribe(
      ()=>{
        this.message = "Module deleted successfully";
      this.setOpen(true);
      this.GetStudentModules(this.userID);
      this.modal2.dismiss();
      this.selectedModule = new StudentModule;
      },
      (error)=>{
        this.message = "Error deleting module, try again later";
      this.setOpen(true);
      });
    }
  }  

  refreshPage(): void {
    window.location.reload();
  }

  message! : string;
  isToastOpen = false;
  top = 'top';
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  selectModule(moduleID : number)
  {
    var module = this.Modules.find(a=>a.moduleID==moduleID);
    if(module){
    this.selectedModule = module;
    this.modal2.present();
  }
  }
}
