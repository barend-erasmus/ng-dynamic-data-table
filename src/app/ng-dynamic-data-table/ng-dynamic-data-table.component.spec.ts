import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicDataTableComponent } from './ng-dynamic-data-table.component';

describe('NgDynamicDataTableComponent', () => {
  let component: NgDynamicDataTableComponent;
  let fixture: ComponentFixture<NgDynamicDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDynamicDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
