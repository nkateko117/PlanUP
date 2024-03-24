import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule implements OnInit{

  ngOnInit() {
    $(document).ready(function () {
      $('#calendar').evoCalendar({
        // Add your calendar settings here
      });
    });
  }
}
