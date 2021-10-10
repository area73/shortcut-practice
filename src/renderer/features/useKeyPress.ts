import { useEffect, useState } from 'react';

// Hook
export default function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true

  // ts-ignore
  function downHandler(kev: KeyboardEvent) {
    console.log(kev);
    console.log(targetKey);
    // if (key === targetKey) {
    setKeyPressed(true);
    // }
  }
  // If released key is our target key then set to false
  const upHandler = (kev: KeyboardEvent) => {
    console.log('UP', kev);
    // if (key === targetKey) {
    setKeyPressed(false);
    // }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener<'keydown'>('keydown', downHandler);
    window.addEventListener<'keyup'>('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
