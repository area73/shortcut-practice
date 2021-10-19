import { flow } from 'fp-ts/function';
import { map, pipe, prop, reduce } from 'ramda';
import { KeyStroke, Shortcut } from 'renderer/mock/shortcuts';

// const getValueFromSpecialKeyMap = getMap(specialKeyMap);
const replace = (subStr: string, replacer: string) => (str: string) =>
  str.replace(new RegExp(subStr, 'gi'), replacer);

const removeKey = replace('Key', '');

const removeDigit = replace('Digit', '');

const changeProp =
  (key: keyof KeyStroke, value: string) => (obj: KeyStroke) => {
    obj[key] && (obj[key] = value);
    return obj;
  };

const getShiftSymbol = changeProp('shiftKey', '⇧');
const getAltSymbol = changeProp('altKey', '⌥');
const getCtrlSymbol = changeProp('ctrlKey', '⌃');
const getMetaSymbol = changeProp('metaKey', '⌘');

const formatCodeKey = (obj: KeyStroke) => {
  obj.code = pipe(removeKey, removeDigit)(obj.code);
  return obj;
};

const keyFormattedGroup = (keys: KeyStroke[]) =>
  flow(
    map(getShiftSymbol),
    map(getAltSymbol),
    map(getCtrlSymbol),
    map(getMetaSymbol),
    map(formatCodeKey)
  )(keys);

export { keyFormattedGroup };
