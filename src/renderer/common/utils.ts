import { equals, length } from 'ramda';


export const hasSameKeys = (prev: string[][], next: string[][]) =>
  prev.reduce((acc, cur, idx) => (equals(cur, next[idx]) ? acc : false), true);
export const sameLength = (prev: string[][], next: string[][]) =>
  equals(length(prev), length(next));





