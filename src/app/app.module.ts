import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FCFSComponent } from './fcfs/fcfs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GanttChartCellComponent } from './gantt-chart-cell/gantt-chart-cell.component';
import { NpsjfComponent } from './npsjf/npsjf.component';
import { PsjfComponent } from './psjf/psjf.component';
import { RrComponent } from './rr/rr.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';
import { MlfqComponent } from './mlfq/mlfq.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FCFSComponent,
    GanttChartCellComponent,
    NpsjfComponent,
    PsjfComponent,
    RrComponent,
    SummaryTableComponent,
    MlfqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
