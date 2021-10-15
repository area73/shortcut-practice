import { either } from 'fp-ts';
import { fromNullable, fromPredicate } from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';

import { chain, map } from 'ramda';
import { specialKeyMap } from './model/keyMapper';

const data = [
  ['Shift', 'keyS'],
  ['Shift', 'Meta', 'KeyS'],
];

// getMap :: Map<A,A> -> A -> A | undefined
const getMap = (keyMap: Map<unknown, unknown>) => (compare: string) =>
  keyMap.get(compare);

// isUndefined :: A -> boolean
// const isUndefined = (a: unknown) => typeof a === 'undefined';

const getMap2 = getMap(specialKeyMap);
const getMapSpecial = getMap(specialKeyMap);
// const getMapSpecialSafe = option.of(getMapSpecial)

// const opt = fromPredicate(isUndefined);

// fromNullable(getMap2('Shift')); // ?

// const getOption = fromPredicate((n: number) => n >= 0);

// assert.deepStrictEqual(getOption(-1), none);

flow(
  getMapSpecial,
  fromNullable('Shift')
  )('Shift'); // ?




  flow(
    getMapSpecial,
    fromNullable('K')
    )('K'); // ?


   flow(
    getMapSpecial,
    fromPredicate(
      (n) => typeof n === 'string',
      () => "dfdf"
    )
    )('K'); // ?




  flow(
    getMapSpecial,
    either.of,

    )('Shifp'); // ?







map(map(getMap2))(data); // ?


// keyToSymbol :: Map -> string -> string
const keyToSymbol = (keyMap: Map<string, string>) => (compare: string) =>
  keyMap.get(compare) ? keyMap.get(compare) : compare;

const keyToSymbolSpecialKeyMap = keyToSymbol(specialKeyMap);

// keyToSymbolSpecialKeyMap('Shift') // ?

map(map(keyToSymbolSpecialKeyMap))(data); // ?

chain(map(keyToSymbolSpecialKeyMap))(data);
