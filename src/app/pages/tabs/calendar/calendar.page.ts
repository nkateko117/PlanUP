import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { TokenDecoderService } from 'src/app/Authentication/token-decoder.service';
import { Activity, StudentModule } from 'src/app/Models/course';
//import { MbscCalendarEvent } from '@mobiscroll/angular';
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage  implements OnInit {

  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }
  
  calendarOptions: any = {
    pickMode: 'single',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  selectedDate! : string;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.token=localStorage.getItem('token');
      const userID = this.decodeToke.decodeInitialToken2(this.token).userId;
      this.userID=userID;
     // this.GetStudentModules(userID);
      this.GetActivities(userID);
  }


  token! : any;
  presentingElement : any;
  userID! : string;
  Activities : Activity [] = [];
  newActivity : Activity = new Activity;
  Modules : StudentModule [] = [];

  GetActivities(ID: string): void {
    this.userService.GetActivities(ID).subscribe(
      (activities: Activity[]) => {
        // Sort activities by date before assigning them to this.Activities
        this.Activities = activities; //.sort((a, b) => (a.date > b.date ? 1 : -1));
        localStorage.setItem('Activities', JSON.stringify(this.Activities));
      },
      (error) => {
        // Handle error
      }
    );
  }
  /*
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  times: string[] = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  events: { [key: string]: string[] } = {};

  addEvent(day: string, time: string) {
    const eventText = prompt('Enter event description:');
    if (eventText) {
      const key = `${day}_${time}`;
      if (!this.events[key]) {
        this.events[key] = [];
      }
      this.events[key].push(eventText);
    }
  }

  getEvents(day: string, time: string): string[] {
    const key = `${day}_${time}`;
    return this.events[key] || [];
  }
  */
  /*
  constructor(private decodeToke : TokenDecoderService, private userService : DataService) { }

  @ViewChild('calendar') calendarEl!: ElementRef;

  ngOnInit() {
    this.initializeCalendar();
  }

  initializeCalendar() {
    const calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [timeGridPlugin],
      initialView: 'timeGridWeek', // Display a weekly view
      events: [
        // Add your events here
        {
          title: 'Event 1',
          start: '2023-09-14T10:00:00',
          end: '2023-09-14T12:00:00',
        },
        {
          title: 'Event 2',
          start: '2023-09-15T14:00:00',
          end: '2023-09-15T16:00:00',
        },
        // Add more events as needed
      ],
    });

    calendar.render();
  }
*/

/*
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
  */

}
