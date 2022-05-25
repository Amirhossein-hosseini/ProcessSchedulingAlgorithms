import process, { clone } from '../../assets/process';
import { compareArrival, compareBurstTime, compareName } from '../comparators/comparators';
import { Queue } from './queue';

export default function mlfq(p: process[], mlfqI: number,mlfqII: number,mlfqIII: number) {
  let waitingList: process[] = [...p].sort(compareArrival);
  let minArr = findMinArrival(p);
  let rrPro: process[] = [...p];
  let rr: process[] = [];
  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  let queue1 = new Queue()
  let queue2 = new Queue()
  let queue3 = new Queue()

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
      if(queue1.size() ==0 && i % mlfqI === 0) {


        rr[rr.length - 1].setEndTime(i);
        waitingList.push(clone(rr[rr.length - 1]));
        waitingList[waitingList.length - 1].setArrivalTime(i);
        waitingList.sort(compareArrival);

        rr.push(clone(waitingList[0]));
        rr[rr.length - 1].setStartTime(i);
        rr[rr.length - 1].setLeftTime();
        queue1.enqueue(rr);
        queue1.enqueue(rrPro)

        waitingList.shift();
      }
      else if(queue2.size()<queue1.size()&& i % mlfqII ==0) {

          rr[rr.length - 1].setEndTime(i);
          waitingList.push(clone(rr[rr.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
          waitingList.sort(compareName);

          rr.push(clone(waitingList[0]));
          rr[rr.length - 1].setStartTime(i);
          rr[rr.length - 1].setLeftTime();
        queue2.enqueue(rr);
        queue2.enqueue(rrPro)

        waitingList.shift();



        }
        else  if(queue3.size()<queue2.size()&&  i % mlfqIII==0){

            rr[rr.length - 1].setEndTime(i);
        waitingList.push(clone(rr[rr.length - 1]));
        waitingList[waitingList.length - 1].setArrivalTime(i);
        waitingList.sort(compareArrival);

        rr.push(clone(waitingList[0]));
        rr[rr.length - 1].setStartTime(i);
        rr[rr.length - 1].setLeftTime();
        queue3.enqueue(rr);
        queue3.enqueue(rrPro)

        waitingList.shift();


      }
          else{
             waitingList.sort(compareBurstTime)
            rr[rr.length - 1].setLeftTime();

          }


    }
  }
  return {rr, rrPro};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
