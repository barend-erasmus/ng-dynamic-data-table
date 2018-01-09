import { Component, OnInit, Input, Output } from '@angular/core';
import { DynamicDataTableModel } from '../models/dynamic-data-table-model';
import { Observable } from 'rxjs/Observable';
import { ColumnModel } from '../models/column-model';

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

  public onClick_SortColumn(column: ColumnModel): void {
    if (!column.sort.direction) {
      column.sort.direction = 'ASC';
    } else if (column.sort.direction == 'ASC') {
      column.sort.direction = 'DSC';
    } else if (column.sort.direction == 'DSC') {
      column.sort.direction = 'ASC';
    }

    this.reloadModel();
  }

  public onClick_FilterColumn(column: ColumnModel): void {
    column.filter.isOpen = !column.filter.isOpen;
  }

  public onClick_NextPage(): void {
    if (this.currentPage < this.pages[this.pages.length - 1]) {
      this.onClick_PageNumber(this.currentPage + 1);
    }
  }

  public onClick_PreviousPage(): void {
    if (this.currentPage > 1) {
      this.onClick_PageNumber(this.currentPage - 1);
    }
  }

  public onClick_PageNumber(page: number): void {

    this.currentPage = page;

    if (this.model) {
      this.model.skip = (this.currentPage * this.model.take);
    }

    this.reloadModel();
  }

  private reloadModel(): void {
    if (this.loadModel) {
      this.loadModel(this.model).subscribe((model) => {
        this.model = model;

        this.calculatePages();
      });
    }
  }

  private calculatePages(): void {
    this.pages = [];

    for (let i = 1; i < Math.ceil(this.model.count / this.model.take); i++) {
      this.pages.push(i);
    }
  }

}
