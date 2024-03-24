import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradesPage } from './grades.page';

describe('GradesPage', () => {
  let component: GradesPage;
  let fixture: ComponentFixture<GradesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GradesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
