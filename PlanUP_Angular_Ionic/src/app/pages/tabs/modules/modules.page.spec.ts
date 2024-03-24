import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesPage } from './modules.page';

describe('ModulesPage', () => {
  let component: ModulesPage;
  let fixture: ComponentFixture<ModulesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
