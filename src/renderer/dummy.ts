import { fromEquals } from 'fp-ts/Eq';
import { specialKeyMap } from './model/keyMapper';

const reference = 'abc';
const candidate = 'abc';

// const refArr = ['a', 'b', 'c'];
// const candArr = ['a', 'b', 'c'];

const isEqualString = fromEquals<string>((a, b) => a === b);

isEqualString.equals(reference, candidate); // ?

const isEqualArray = fromEquals<string[]>((a, b) =>
  a.reduce<boolean>((acc, cur, idx) => (cur !== b[idx] ? false : acc), true)
);

isEqualArray.equals(['a', 'b'], ['a', 'c']); // ?

Array.from(specialKeyMap.keys()); // ?
