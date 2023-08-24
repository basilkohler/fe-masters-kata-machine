export default function two_crystal_balls(breaks: boolean[]): number {
  const sn = Math.floor(Math.sqrt(breaks.length));
  let n = 0;

  let i = sn;
  for(; i < breaks.length; i+=sn) {
    if (breaks[i]) {
      break;
    }
  }
  i = i - sn;
  for (let j = 0; j < sn && i < breaks.length; ++j, ++i) {
    if (breaks[i]) {
      return i;
    }
  }
  return -1;
}
