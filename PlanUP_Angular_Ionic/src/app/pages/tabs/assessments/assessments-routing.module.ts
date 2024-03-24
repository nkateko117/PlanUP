import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentsPage } from './assessments.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentsPageRoutingModule {}
