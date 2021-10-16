import { flow } from 'fp-ts/function';
import { map, reduce } from 'ramda';

const specialKeyMap = new Map<string, string>()
  .set('Shift', '⇧')
  .set('Alt', '⌥')
  .set('Control', '⌃')
  .set('Meta', '⌘');

// getMap :: Map<A,A> -> A -> A | undefined
const getMap =
  (keyMap: Map<string, string>) =>
  (compare: string): string =>
    keyMap.get(compare) || compare;

const getValueFromSpecialKeyMap = getMap(specialKeyMap);
const replace = (subStr: string, replacer: string) => (str: string) =>
  str.replace(new RegExp(subStr, 'gi'), replacer);

const removeKey = replace('Key', '');
const removeDigit = replace('Digit', '');

const combine = (xs: string[]) => reduce((a, b) => a + b, '', xs);
const joinWithComa = (xs: string[]) => xs.join(',');

const keyFormattedGroup = (keys: string[][]) =>
  flow(
    map(map(getValueFromSpecialKeyMap)),
    map(combine),
    map(removeKey),
    map(removeDigit),
    joinWithComa
  )(keys);

export { specialKeyMap, keyFormattedGroup };
