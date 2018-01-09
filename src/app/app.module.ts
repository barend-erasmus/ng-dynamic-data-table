import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgDynamicDataTableComponent } from './ng-dynamic-data-table/ng-dynamic-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NgDynamicDataTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
