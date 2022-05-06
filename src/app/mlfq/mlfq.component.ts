import { Component, Input, OnInit } from '@angular/core';
import mlfq from 'src/assets/algorithms/pmlfq';
import process from '../../assets/process';

@Component({
  selector: 'app-mlfq',
  templateUrl: './mlfq.component.html',
  styleUrls: ['./mlfq.component.css']
})
export class MlfqComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  rrprocess: process[] = [];
  calprocess: process[] = [];

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
    this.generateProcess();
    this.calculatePSJF();
  }

  generateProcess() {
    this.myProcess.processes.forEach((p: { name: string; start: number; burst: number; color: any; }) => {
      this.process.push(new process(p.name, p.start,  p.burst, p.color))
    })
  }

  calculatePSJF() {
    this.rrprocess = mlfq(this.process, this.myProcess.rr).rr;
    this.calprocess = mlfq(this.process, this.myProcess.rr).rrPro
    console.log(this.rrprocess.length);
    this.totalBurstTime = this.rrprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  }

}


