import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssessmentsPageRoutingModule } from './assessments-routing.module';

import { AssessmentsPage } from './assessments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentsPageRoutingModule
  ],
  declarations: [AssessmentsPage]
})
export class AssessmentsPageModule {}
