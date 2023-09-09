import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
//import { CalendarComponentOptions, CalendarComponent } from 'ionic7-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  ngOnInit() {
  }

  eventSource: any[] = [];
  calendarOptions: CalendarComponentOptions = {
    displayEventEndTimes: true,
    showEventDetail: false,
    autoSelect: false,
  };

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

  /*
  onEventSelected(event: any) {
    // Handle event selection here
    console.log(event);
  }

  addEvent() {
    const modalOptions: CalendarModalOptions = {
      title: 'Add Event',
      pickMode: 'range',
      color: 'primary',
      doneLabel: 'Save',
    };

    const calendarModal = this.modalCtrl.create(CalendarModal, { options: modalOptions });

    calendarModal.present();

    calendarModal.onDidDismiss().then((result: CalendarResult) => {
      if (result.from && result.to) {
        // Create a new event and add it to the event source
        const newEvent = {
          title: 'New Event',
          startTime: result.from.toISOString(),
          endTime: result.to.toISOString(),
          allDay: result.allDay,
        };
        this.eventSource.push(newEvent);
      }
    });
  }
  */
}
