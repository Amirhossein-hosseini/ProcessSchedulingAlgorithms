import { ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from './table/table.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Process-Scheduling-Algorithms';
  submitted = false;
  fcfs = true;
  npsjf = true;
  psjf = true;
  rr = true;
  mlfq = true;
  @ViewChild(TableComponent) process: any;

  receiveMessage($event: any) {
    this.submitted = $event;
  }

  changeState($event: any) {
    let id:string = $event.target.id;

    if (id === "fcfs" || id === "npsjf"  || id === "psjf" || id === "rr" || id === "mlfq")
      this[id] = $event.target.checked;
  }

}
