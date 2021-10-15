import { concat, prop, props, pipe, __ } from 'ramda';
import { useEffect, useState } from 'react';
import { specialKeyMap } from '../model/keyMapper';

const isSpecialKey = (key: string) => specialKeyMap.has(key);

// keysFromMap :: Map -> string[]
const keysFromMap = (mapObj: Map<string, string>) => Array.from(mapObj.keys());
const toLowerCase = (str: string) => str.toLowerCase();
const substitute = (str: string) => str.replace('Control', 'ctrl');

const convertToKeyEvent = (str: string) =>
  pipe(substitute, toLowerCase, concat(__, 'Key'))(str);

const commonKeysFromMapAndKeyboardEvent =
  (keysMap: Map<string, string>) => (keyEvent: KeyboardEvent) => {
    const rawKeys = keysFromMap(keysMap); // ?
    const keys = rawKeys.map(convertToKeyEvent); // ?
    const values = props(keys, keyEvent as unknown as Record<string, unknown>);
    return values.reduce<string[]>(
      (acc, curr, idx) => (curr ? [...acc, keys[idx]] : acc),
      []
    );
  };

const specialKeys = commonKeysFromMapAndKeyboardEvent(specialKeyMap);

const code = (keyEvent: KeyboardEvent) => prop('code', keyEvent);

const composeWithSpecialKeys = (keyEvent: KeyboardEvent) => [
  ...specialKeys(keyEvent),
  code(keyEvent),
];

// Hook
export default function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<string[] | undefined>(undefined);

  const downHandler = (kev: KeyboardEvent) => {
    setKeyPressed(
      isSpecialKey(kev.key) ? undefined : composeWithSpecialKeys(kev)
    );
    kev.preventDefault();
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener<'keydown'>('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
