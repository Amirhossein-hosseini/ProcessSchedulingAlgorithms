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
  }, 0)+ minArr
  let queue= new Queue()
  let queue2=  new Queue()
  let queue3 = new Queue()
let queueTotal = new Queue<any>()
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
      if(waitingList.length>0 && i % mlfqI === 0) {

          mlfq[mlfq.length - 1].setEndTime(mlfqI+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(i);
          waitingList.sort(compareArrival);

          mlfq.push(clone(waitingList[0]));
          mlfq[mlfq.length - 1].setStartTime(i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();

    // else{

    if(mlfq[mlfq.length - 1].isCompleted() ){
      if(queue.size() ==0){

        mlfq[mlfq.length - 1].setEndTime(i);
        waitingList.push(clone(mlfq[mlfq.length - 1]));
        waitingList[waitingList.length - 1].setArrivalTime(i);
        waitingList.sort(compareArrival);

        mlfq.push(clone(waitingList[0]));
        mlfq[mlfq.length - 1].setStartTime(i);
        mlfq[mlfq.length - 1].setLeftTime();
        waitingList.shift();
      }

    }



      // mlfq[mlfq.length - 1].setLeftTime();
      queue.enqueue(clone(mlfq[mlfq.length - 1]))

    // }


//   if(mlfq[mlfq.length - 1].isCompleted()){
//     mlfq[mlfq.length - 1].setEndTime(i);
//     waitingList.push(clone(mlfq[mlfq.length - 1]));
//     waitingList[waitingList.length - 1].setArrivalTime(i);
//      queue.enqueue(clone(mlfq[mlfq.length - 1]))
//     waitingList.sort(compareArrival);

//     mlfq.push(clone(waitingList[0]));
//     mlfq[mlfq.length - 1].setStartTime(i);
//     mlfq[mlfq.length - 1].setLeftTime();
//     waitingList.shift();
// }

// mlfq[mlfq.length - 1].setEndTime(i);
// waitingList.push(clone(mlfq[mlfq.length - 1]));
// waitingList[waitingList.length - 1].setArrivalTime(i);
//  queue.enqueue(clone(mlfq[mlfq.length - 1]))
// waitingList.sort(compareArrival);

// mlfq.push(clone(waitingList[0]));
// mlfq[mlfq.length - 1].setStartTime(i);
// mlfq[mlfq.length - 1].setLeftTime();
// waitingList.shift();


      }
      else if(waitingList.length>0 && i %mlfqII==0) {


          // mlfq[mlfq.length - 1].setEndTime(mlfqII+i);
          // waitingList.push(clone(mlfq[mlfq.length - 1]));
          // waitingList[waitingList.length - 1].setArrivalTime(i);
          //  queue2.enqueue(clone(mlfq[mlfq.length - 1]))

          // waitingList.sort(compareArrival);



          // mlfq.push(clone(waitingList[0]));
          // mlfq[mlfq.length - 1].setStartTime(mlfqII+i);
          // mlfq[mlfq.length - 1].setLeftTime();
          // waitingList.shift();

          if(mlfq[mlfq.length - 1].isCompleted()){
            if(queue2.size()==0){

              if(mlfq[mlfq.length - 1].isCompleted() ) {
                mlfq[mlfq.length - 1].setEndTime(mlfqII+i);
                waitingList.push(clone(mlfq[mlfq.length - 1]));
                waitingList[waitingList.length - 1].setArrivalTime(mlfqII+i);
                 queue2.enqueue(clone(mlfq[mlfq.length - 1]))
                waitingList.sort(compareArrival);

                mlfq.push(clone(waitingList[0]));
                mlfq[mlfq.length - 1].setStartTime(mlfqII+i);
                mlfq[mlfq.length - 1].setLeftTime();
                waitingList.shift();
            }
            }
          }



        // mlfq[mlfq.length - 1].setLeftTime();

        queue2.enqueue(clone(mlfq[mlfq.length - 1]))





      }
      else if(queue3.size()<queue2.size() && i %mlfqIII==0){
      //   if(mlfq[mlfq.length - 1].isArrived(mlfqIII)){
          // mlfq[mlfq.length - 1].setEndTime(mlfqIII+i);
          // waitingList.push(clone(mlfq[mlfq.length - 1]));
          // waitingList[waitingList.length - 1].setArrivalTime(i);
          //  queue2.enqueue(clone(mlfq[mlfq.length - 1]))
          // waitingList.sort(compareArrival);

          // mlfq.push(clone(waitingList[0]));
          // mlfq[mlfq.length - 1].setStartTime(mlfqII+i);
          // mlfq[mlfq.length - 1].setLeftTime();
          // waitingList.shift();
      // }

      if(mlfq[mlfq.length - 1].isCompleted()){
        if(queue3.size()==0){
          mlfq[mlfq.length - 1].setEndTime(mlfqIII+i);
          waitingList.push(clone(mlfq[mlfq.length - 1]));
          waitingList[waitingList.length - 1].setArrivalTime(mlfqIII+i);
           queue2.enqueue(clone(mlfq[mlfq.length - 1]))
          waitingList.sort(compareArrival);

          mlfq.push(clone(waitingList[0]));
          mlfq[mlfq.length - 1].setStartTime(mlfqIII+i);
          mlfq[mlfq.length - 1].setLeftTime();
          waitingList.shift();
      }

      }



        mlfq[mlfq.length - 1].setLeftTime();

        queue3.enqueue(clone(mlfq[mlfq.length - 1]))

        // mlfq[mlfq.length - 1].setLeftTime();




      }
      else{
  //  waitingList.sort(compareName);
  mlfq[mlfq.length - 1].setLeftTime();

      }
    }
  }

    return {mlfq, mlfqPro};


  return
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min )
        min = p.getArrivalTime();
    })

  return min;
}


