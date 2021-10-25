import { join, map, pipe, values, isNil, reject } from 'ramda';
import { KeyStroke } from 'renderer/mock/shortcuts';

// const getValueFromSpecialKeyMap = getMap(specialKeyMap);
const replace = (subStr: string, replacer: string) => (str: string) =>
  str.replace(new RegExp(subStr, 'gi'), replacer);

const removeKey = replace('Key', '');

const removeDigit = replace('Digit', '');

const changeProp =
  (key: keyof KeyStroke, value: string) => (obj: KeyStroke) => ({
    ...obj,
    [key]: value,
  });

const getShiftSymbol = changeProp('shiftKey', '⇧');
const getAltSymbol = changeProp('altKey', '⌥');
const getCtrlSymbol = changeProp('ctrlKey', '⌃');
const getMetaSymbol = changeProp('metaKey', '⌘');

const formatCodeKey = (obj: KeyStroke) => {
  obj.code = pipe(removeKey, removeDigit)(obj.code);
  return obj;
};

const keyTransformed = pipe(
  getShiftSymbol,
  getAltSymbol,
  getCtrlSymbol,
  getMetaSymbol,
  formatCodeKey,
  reject(isNil)
);

const keyFormattedGroup = pipe(
  map(keyTransformed),
  map(pipe(values, join(''))),
  join(',')
);

export { keyFormattedGroup, keyTransformed };
