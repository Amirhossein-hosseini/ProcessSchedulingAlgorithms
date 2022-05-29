import process, { clone } from '../../assets/process';
import { compareArrival, compareBurstTime, compareName } from '../comparators/comparators';
import { Queue } from './queue';

export default function mlfq(p: process[], mlfqI: number,mlfqII: number,mlfqIII: number) {
  let waitingList: process[] = [...p].sort(compareArrival);
  let minArr = findMinArrival(p);
  let mlfqPro: process[] = [...p];
  let mlfq: process[] = [];
  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total +currp.getBurstTime();
  }, 0)
  let queue= new Queue()
  let queue2=  new Queue()
  let queue3 = new Queue()
let queueTotal = new Queue()
queueTotal.enqueue(queue);
queueTotal.enqueue(queue2);
queueTotal.enqueue(queue3)
  mlfq.push(clone(waitingList[0]));
  mlfq[0].setStartTime(minArr);
  mlfq[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr+1; i <= totalBurstTime; i++) {




    if(mlfq[mlfq.length - 1].isCompleted()) {
      mlfq[mlfq.length - 1].setEndTime(i);

      let temp = mlfqPro.find(o => o.getProcessName() === mlfq[mlfq.length - 1].getProcessName());
      let index: number;
      if(temp){
        index = mlfqPro.indexOf(temp);
        mlfqPro[index].setEndTime(mlfq[mlfq.length - 1].getEndTime());
        mlfqPro[index].setTurnAround(i - mlfqPro[index].getArrivalTime());
        mlfqPro[index].setWaitTime(mlfqPro[index].getTurnAround() - mlfqPro[index].getBurstTime());
      }

      if(waitingList.length > 0) {
        mlfq.push(clone(waitingList[0]));
        mlfq[mlfq.length - 1].setStartTime(i);
        mlfq[mlfq.length - 1].setLeftTime();
        waitingList.shift();

        let temp = mlfqPro.find(o => o.getProcessName() === mlfq[mlfq.length - 1].getProcessName());
        let index: number;
        if(temp){
          index = mlfqPro.indexOf(temp);
          mlfqPro[index].setStartTime(mlfq[mlfq.length - 1].getStartTime());
        }
      }
    }
    else {
      if(queue.size()==0 && i % mlfqI === 0) {

          mlfq[mlfq.length - 1].setEndTime(mlfqI+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
           queue.enqueue(clone(mlfq[mlfq.length - 1]))
          waitingList.sort(compareArrival);

          mlfq.push(clone(waitingList[0]));
          mlfq[mlfq.length - 1].setStartTime(i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();


          if(mlfq[mlfq.length - 1].isArrived(mlfqI)){

          mlfq[mlfq.length - 1].setEndTime(mlfqI+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
           queue.enqueue(clone(mlfq[mlfq.length - 1]))
          waitingList.sort(compareArrival);

          mlfq.push(clone(waitingList[0]));
          mlfq[mlfq.length - 1].setStartTime(i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();
          }
  if(mlfq[mlfq.length - 1].isCompleted()){
    mlfq[mlfq.length - 1].setEndTime(i);
    waitingList.push(clone(mlfq[mlfq.length - 1]));
    waitingList[waitingList.length - 1].setArrivalTime(i);
     queue.enqueue(clone(mlfq[mlfq.length - 1]))
    waitingList.sort(compareArrival);

    mlfq.push(clone(waitingList[0]));
    mlfq[mlfq.length - 1].setStartTime(i);
    mlfq[mlfq.length - 1].setLeftTime();
    waitingList.shift();
}
mlfq[mlfq.length - 1].setEndTime(i);
waitingList.push(clone(mlfq[mlfq.length - 1]));
waitingList[waitingList.length - 1].setArrivalTime(i);
 queue.enqueue(clone(mlfq[mlfq.length - 1]))
waitingList.sort(compareArrival);

mlfq.push(clone(waitingList[0]));
mlfq[mlfq.length - 1].setStartTime(i);
mlfq[mlfq.length - 1].setLeftTime();
waitingList.shift();


      }
      else if(queue2.size()<queue.size() && i %mlfqII==0) {


          mlfq[mlfq.length - 1].setEndTime(mlfqII+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
           queue2.enqueue(clone(mlfq[mlfq.length - 1]))

          waitingList.sort(compareArrival);

          // if(mlfq[mlfq.length - 1].isArrived(mlfqII)){
          //   queue2.enqueue(clone(mlfq[mlfq.length -1]))
          // }

          mlfq.push(clone(waitingList[0]));
          mlfq[mlfq.length - 1].setStartTime(i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();



          if(mlfq[mlfq.length - 1].isArrived(mlfqII)){

            mlfq[mlfq.length - 1].setEndTime(mlfqII+i);
            waitingList.push(clone(mlfq[mlfq.length - 1]));
            waitingList[waitingList.length - 1].setArrivalTime(i);
             queue2.enqueue(clone(mlfq[mlfq.length - 1]))
            waitingList.sort(compareArrival);

            mlfq.push(clone(waitingList[0]));
            mlfq[mlfq.length - 1].setStartTime(i);
            mlfq[mlfq.length - 1].setLeftTime();
            waitingList.shift();
            }



      }
      else if(queue3.size()<queue2.size() && i %mlfqIII==0){

          mlfq[mlfq.length - 1].setEndTime(mlfqIII+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
          //  queue3.enqueue(clone(mlfq[mlfq.length - 1]))

          waitingList.sort(compareArrival);



          mlfq.push(clone(waitingList[0]));
          //queue3.enqueue(clone(mlfq[waitingList.length - 1]))
          mlfq[mlfq.length - 1].setStartTime(i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();



          if(mlfq[mlfq.length - 1].isArrived(mlfqIII)){

            mlfq[mlfq.length - 1].setEndTime(mlfqIII+i);
            waitingList.push(clone(mlfq[mlfq.length - 1]));
            waitingList[waitingList.length - 1].setArrivalTime(i);
             queue3.enqueue(clone(mlfq[mlfq.length - 1]))
            waitingList.sort(compareArrival);

            mlfq.push(clone(waitingList[0]));
            mlfq[mlfq.length - 1].setStartTime(i);
            mlfq[mlfq.length - 1].setLeftTime();
            waitingList.shift();
            }


      }
      else{
   waitingList.sort(compareName);
   mlfq[mlfq.length - 1].setLeftTime();

      }
    }
  }
  return {mlfq, mlfqPro};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min )
        min = p.getArrivalTime();
    })

  return min;
}


