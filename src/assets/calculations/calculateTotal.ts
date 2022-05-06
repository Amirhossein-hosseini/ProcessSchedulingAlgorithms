import Process from '../process';

export function totalTurnAround (process: Process[]) {
  let total = process.reduce((sum, p) => {
    return sum + p.getTurnAround();
  }, 0);

  return total;
}

export function totalWaitingTime (process: Process[]) {
  let total = process.reduce((sum, p) => {
    return sum + p.getWaitTime();
  }, 0);

  return total;
}




