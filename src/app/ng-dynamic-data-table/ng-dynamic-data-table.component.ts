import { Component, OnInit, Input, Output } from '@angular/core';
import { DynamicDataTableModel } from '../models/dynamic-data-table-model';
import { Observable } from 'rxjs/Observable';
import { ColumnModel } from '../models/column-model';
import { CheckboxValueModel } from '../models/checkbox-value-model';

@Component({
  selector: 'ng-dynamic-data-table',
  templateUrl: './ng-dynamic-data-table.component.html',
  styleUrls: ['./ng-dynamic-data-table.component.css']
})
export class NgDynamicDataTableComponent implements OnInit {

  public model: DynamicDataTableModel = null;

  public pages: number[] = null;
  public currentPage: number = 1;

  @Input()
  public loadModel: (model: DynamicDataTableModel) => Observable<DynamicDataTableModel> = null;

  constructor() {

  }

  public ngOnInit(): void {
    this.reloadModel();
  }

  public onClick_FilterColumn(column: ColumnModel): void {
    column.filter.isOpen = !column.filter.isOpen;

    if (!column.filter.isOpen) {
      this.onClick_PageNumber(1);
    }
  }

  public onClick_FilterColumnCheckbox(column: ColumnModel, checkboxValue: CheckboxValueModel): void {
    checkboxValue.selected = !checkboxValue.selected;
  }

  public onClick_NextPage(): void {
    if (this.currentPage < this.pages[this.pages.length - 1]) {
      this.onClick_PageNumber(this.currentPage + 1);
    }
  }

  public onClick_PageNumber(page: number): void {

    this.currentPage = page;

    if (this.model) {
      this.model.skip = ((this.currentPage - 1) * this.model.take);
    }

    this.reloadModel();
  }

  public onClick_PreviousPage(): void {
    if (this.currentPage > 1) {
      this.onClick_PageNumber(this.currentPage - 1);
    }
  }

  public onClick_SortColumn(column: ColumnModel): void {

    if (!column.sort) {
      return;
    }

    let direction = null;

    if (!column.sort.direction) {
      direction = 'ASC';
    } else if (column.sort.direction == 'ASC') {
      direction = 'DSC';
    } else if (column.sort.direction == 'DSC') {
      direction = 'ASC';
    }

    this.clearAllColumnSorting();

    column.sort.direction = direction;

    this.reloadModel();
  }

  private calculatePages(): void {
    this.pages = [];

    for (let i = 1; i < Math.ceil(this.model.count / this.model.take) + 1; i++) {
      this.pages.push(i);
    }
  }

  private clearAllColumnSorting(): void {
    for (const column of this.model.columns) {
      if (column.sort) {
        column.sort.direction = null;
      }
    }
  }

  private reloadModel(): void {
    if (this.loadModel) {
      this.loadModel(this.model).subscribe((model) => {
        this.model = model;

        this.calculatePages();
      });
    }
  }
}
