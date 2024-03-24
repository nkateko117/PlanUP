import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsPage } from './assessments.page';

describe('AssessmentsPage', () => {
  let component: AssessmentsPage;
  let fixture: ComponentFixture<AssessmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssessmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
