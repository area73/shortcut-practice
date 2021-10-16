import { filter, identity, keys, pick, pipe, prop } from 'ramda';
import { useEffect, useState } from 'react';

// const isSpecialKey = (key: string) => specialKeyMap.has(key);

const code = (keyEvent: KeyboardEvent) => prop('code', keyEvent);

const specialKeys = pipe(
  pick<string>(['metaKey', 'ctrlKey', 'altKey', 'shiftKey']),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filter<string, boolean>(identity),
  keys
);

const isSpecialKey = (key: string) =>
  ['Meta', 'Control', 'Alt', 'Shift'].indexOf(key) > -1;

const composeWithSpecialKeys = (keyEvent: KeyboardEvent) => [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
