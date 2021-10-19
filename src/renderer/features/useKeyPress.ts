import { useEffect, useState } from 'react';
import { KeyStroke } from 'renderer/mock/shortcuts';

const isSpecialKey = (key: string) =>
  ['Meta', 'Control', 'Alt', 'Shift'].indexOf(key) > -1;

const composeWithSpecialKeys = ({
  code,
  metaKey,
  shiftKey,
  altKey,
  ctrlKey,
}: KeyboardEvent) => ({
  code,
  metaKey,
  shiftKey,
  altKey,
  ctrlKey,
});

// Hook
export default function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<KeyStroke | undefined>(
    undefined
  );

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
