import { Component, Input, OnInit } from '@angular/core';
import rr from '../../assets/algorithms/rr';
import Process, { clone } from '../../assets/process';
import process from '../../assets/process';
import { compareArrival, compareBurstTime, compareName } from '../comparators/comparators';
import { Queue } from './queue';

export default function mlfq(p:Process[],mlfqI:number,mlfqII:number,mlfqIII:number){
  let waitingList: process[] = [...p].sort(compareArrival);
  let minArr = findMinArrival(p);
  let rrPro: process[] = [...p];
  let rr: process[] = [];
let qeue1 = new Queue()
let qeue2 = new Queue()
let qeue3 = new Queue()
let queue4 = new Queue()

  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;


  rr.push(clone(waitingList[0]));
  rr[0].setStartTime(minArr);
  rr[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr + 1; i <= totalBurstTime; i++) {
    if(rr[rr.length - 1].isCompleted()) {
      rr[rr.length - 1].setEndTime(i);

      let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
      let index: number;
      if(temp){
        index = rrPro.indexOf(temp);
        rrPro[index].setEndTime(rr[rr.length - 1].getEndTime());
        rrPro[index].setTurnAround(i - rrPro[index].getArrivalTime());
        rrPro[index].setWaitTime(rrPro[index].getTurnAround() - rrPro[index].getBurstTime());
      }

      if(waitingList.length > 0) {
        rr.push(clone(waitingList[0]));
        rr[rr.length - 1].setStartTime(i);
        rr[rr.length - 1].setLeftTime();
        waitingList.shift();

        let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
        let index: number;
        if(temp){
          index = rrPro.indexOf(temp);
          rrPro[index].setStartTime(rr[rr.length - 1].getStartTime());
        }
      }
    }
    else {
      // qeue1.enqueue(rrPro)

      if( qeue1.size() ==0 && i % mlfqI === 0) {

          rr[rr.length - 1].setEndTime(i);
          waitingList.push(clone(rr[rr.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
          waitingList.sort(compareArrival);

          rr.push(clone(waitingList[0]));
          rr[rr.length - 1].setStartTime(i);
          rr[rr.length - 1].setLeftTime();
          waitingList.shift();





        qeue1.enqueue(rr);
        qeue1.enqueue(rrPro);
      }
   else if(qeue2.size()<qeue1.size() && i % mlfqII ===0){


          // let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
          // let index: number;
          // if(temp){
          //   index = rrPro.indexOf(temp);
          //   rrPro[index].setStartTime(rr[rr.length - 1].getStartTime());
          // }

            rr[rr.length - 1].setEndTime(i);
            waitingList.push(clone(rr[rr.length - 1]));
            waitingList[waitingList.length - 1].setArrivalTime(i);
            waitingList.sort(compareArrival);

            rr.push(clone(waitingList[0]));
            rr[rr.length - 1].setStartTime(i);
            rr[rr.length - 1].setLeftTime();
            waitingList.shift();



          qeue2.enqueue(rr);
          qeue2.enqueue(rrPro)


      }



     else if(qeue3.size()<qeue2.size() && i % mlfqIII ===0){
        // let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
        // let index: number;
        // if(temp){
        //   index = rrPro.indexOf(temp);
        //   rrPro[index].setStartTime(rr[rr.length - 1].getStartTime());
        // }

          rr[rr.length - 1].setEndTime(i);
          waitingList.push(clone(rr[rr.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
          waitingList.sort(compareArrival);

          rr.push(clone(waitingList[0]));
          rr[rr.length - 1].setStartTime(i);
          rr[rr.length - 1].setLeftTime();
          waitingList.shift();





        qeue3.enqueue(rr);
        qeue3.enqueue(rrPro)



      }

      else{

rr[rr.length - 1].setLeftTime()



      }
      // rr[rr.length - 1].setLeftTime()

        // if(qeue3.size()>queue4.size() ){


        //   }








    }

}



  return {rr, rrPro};




















return { rr,rrPro}


function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}


function range(start: number,end: number){
let foo = []

  for(let i = start; i <= end; i++){
    foo.push(i)
  }

  return foo

}

}

function qu3(){
  // rr.push(clone(waitingList[0]));
  // rr[0].setStartTime(minArr);
  // rr[0].setLeftTime();
  // waitingList.shift();
  // for(let i = minArr + 1; i <= totalBurstTime; i++) {
  //   if(rr[rr.length - 1].isCompleted()) {
  //     rr[rr.length - 1].setEndTime(i);

  //     let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
  //     let index: number;
  //     if(temp){
  //       index = rrPro.indexOf(temp);
  //       rrPro[index].setEndTime(rr[rr.length - 1].getEndTime());
  //       rrPro[index].setTurnAround(i - rrPro[index].getArrivalTime());
  //       rrPro[index].setWaitTime(rrPro[index].getTurnAround() - rrPro[index].getBurstTime());
  //     }

  //     if(waitingList.length > 0) {
  //       rr.push(clone(waitingList[0]));
  //       rr[rr.length - 1].setStartTime(i);
  //       rr[rr.length - 1].setLeftTime();
  //       waitingList.shift();

  //       let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
  //       let index: number;
  //       if(temp){
  //         index = rrPro.indexOf(temp);
  //         rrPro[index].setStartTime(rr[rr.length - 1].getStartTime());
  //       }
  //     }
  //   }
  //   else {
  //     if(waitingList.length > 0 && i % mlfqIII === 0) {
  //       rr[rr.length - 1].setEndTime(i);
  //       waitingList.push(clone(rr[rr.length - 1]));
  //       waitingList[waitingList.length - 1].setArrivalTime(i);
  //       waitingList.sort(compareArrival);

  //       rr.push(clone(waitingList[0]));
  //       rr[rr.length - 1].setStartTime(i);
  //       rr[rr.length - 1].setLeftTime();
  //       waitingList.shift();
  //     }
  //     else {
  //       rr[rr.length - 1].setLeftTime();

  //     }
  //   }
  // }
  // return {rr, rrPro};
}
