import { Component, Input, OnInit } from '@angular/core';
import mlfq from 'src/assets/algorithms/mlfq';
import process from '../../assets/process';

@Component({
  selector: 'app-mlfq',
  templateUrl: './mlfq.component.html',
  styleUrls: ['./mlfq.component.css']
})
export class MlfqComponent implements OnInit {
  totalBurstTime = 0;
  process: process[] = [];
  mlfqprocess: process[] = [];
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
    this.mlfqprocess = mlfq(this.process, this.myProcess.mlfqI,this.myProcess.mlfqII,this.myProcess.mlfqIII).mlfq
    this.calprocess = mlfq(this.process, this.myProcess.mlfqI,this.myProcess.mlfqII,this.myProcess.mlfqIII).mlfqPro
    console.log(this.mlfqprocess.length);
    this.totalBurstTime = this.mlfqprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  }


}
