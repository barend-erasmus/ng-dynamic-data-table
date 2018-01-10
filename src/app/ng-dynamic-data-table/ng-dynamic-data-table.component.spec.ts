import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicDataTableComponent } from './ng-dynamic-data-table.component';
import { DynamicDataTableModel } from '../models/dynamic-data-table-model';
import { Observable } from 'rxjs/Observable';
import { ColumnModel } from '../models/column-model';
import { FilterModel } from '../models/filter-model';
import { SortModel } from '../models/sort-model';
import { CheckboxValueModel } from '../models/checkbox-value-model';

describe('NgDynamicDataTableComponent', () => {
  let component: NgDynamicDataTableComponent;
  let fixture: ComponentFixture<NgDynamicDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgDynamicDataTableComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicDataTableComponent);
    component = fixture.componentInstance;

    component.loadModel = (model) => {
      return new Observable((observer) => {
        observer.next(new DynamicDataTableModel(
          [
            new ColumnModel('first_name', null, 'First Name', new SortModel(null), 'text'),
            new ColumnModel('last_name', null, 'Last Name', new SortModel(null), 'text'),
            new ColumnModel('email', new FilterModel(false, null, 'text', null, null), 'Email Address', null, 'text'),
            new ColumnModel('gender', new FilterModel(false, null, 'checkbox', null, [
              new CheckboxValueModel('Male', true, 'Male'),
              new CheckboxValueModel('Female', true, 'Female'),
            ]), 'Gender', null, 'text'),
            new ColumnModel('ip_address', null, 'IP Address', null, 'text'),
            new ColumnModel('clicks', new FilterModel(false, null, 'numeric', null, null), 'Number of Clicks', null, 'numeric'),
          ],
          10,
          [
            { "id": 1, "first_name": "Billie", "last_name": "Midner", "email": "bmidner0@webmd.com", "gender": "Male", "ip_address": "68.188.162.198", "clicks": 68 },
            { "id": 2, "first_name": "Dalli", "last_name": "China", "email": "dchina1@ftc.gov", "gender": "Male", "ip_address": "222.241.35.141", "clicks": 47 },
            { "id": 3, "first_name": "Jed", "last_name": "Hindrich", "email": "jhindrich2@phoca.cz", "gender": "Male", "ip_address": "68.44.92.243", "clicks": 76 },
            { "id": 4, "first_name": "Luther", "last_name": "Lantuff", "email": "llantuff3@hp.com", "gender": "Male", "ip_address": "130.107.105.138", "clicks": 25 },
            { "id": 5, "first_name": "Cassaundra", "last_name": "Nast", "email": "cnast4@photobucket.com", "gender": "Female", "ip_address": "148.239.146.232", "clicks": 81 },
            { "id": 6, "first_name": "Eolande", "last_name": "De Freyne", "email": "edefreyne5@mtv.com", "gender": "Female", "ip_address": "73.63.214.69", "clicks": 91 },
            { "id": 7, "first_name": "Erasmus", "last_name": "Doonican", "email": "edoonican6@unc.edu", "gender": "Male", "ip_address": "112.217.111.231", "clicks": 86 },
            { "id": 8, "first_name": "Lissi", "last_name": "Dinnage", "email": "ldinnage7@dedecms.com", "gender": "Female", "ip_address": "59.187.174.126", "clicks": 24 },
            { "id": 9, "first_name": "Deeyn", "last_name": "Kybbye", "email": "dkybbye8@4shared.com", "gender": "Female", "ip_address": "70.97.188.40", "clicks": 34 },
            { "id": 10, "first_name": "Winfred", "last_name": "Freckelton", "email": "wfreckelton9@netlog.com", "gender": "Male", "ip_address": "5.83.29.13", "clicks": 84 },
          ],
          null,
          0,
          3,
        ));

        observer.complete();
      });
    };

    fixture.detectChanges();
  });

  describe('UI', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
