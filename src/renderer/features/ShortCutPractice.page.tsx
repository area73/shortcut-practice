import { equals, length } from 'ramda';
import { useEffect, useState } from 'react';
import useKeyPress from './useKeyPress';

type Shortcut = {
  key: string;
  description: string;
  note: string;
  keyStrokes: string[][];
  section: string;
};

const mockData: Shortcut[] = [
  {
    key: '0',
    description: 'Keyboard TEST',
    note: '',
    keyStrokes: [['KeyK'], ['KeyS']],
    section: 'General',
  },
  {
    key: '1',
    description: 'Keyboard Shortcuts',
    note: '',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'KeyS'],
    ],
    section: 'General',
  },
  {
    key: '2',
    description: 'Fold all regions',
    note: '',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'Key9'],
    ],
    section: 'Basic Editing',
  },
  {
    key: '3',
    description: 'Unfold all regions',
    note: '',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'Key0'],
    ],
    section: 'Basic Editing',
  },
];

const hasSameKeys = (prev: string[][], next: string[][]) =>
  prev.reduce((acc, cur, idx) => (equals(cur, next[idx]) ? acc : false), true);

const sameLength = (prev: string[][], next: string[][]) =>
  equals(length(prev), length(next));

export default function ShortCutPractice() {
  const { description, note, keyStrokes, section } = mockData[0];
  const [pressedKeys, setPressedKeys] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const [componentState, setComponentState] = useState<
    'error' | 'success' | 'inProgress'
  >('inProgress');

  const keyPressed = useKeyPress();

  const success =
    sameLength(pressedKeys, keyStrokes) && hasSameKeys(pressedKeys, keyStrokes);

  const error = !hasSameKeys(pressedKeys, keyStrokes);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log(
      'keyPressed EFFECT',
      keyPressed,
      'pressedKeys',
      pressedKeys,
      success,
      error,
      componentState
    );

    if (keyPressed) {
      setPressedKeys([...pressedKeys, keyPressed]);
    }
  }, [keyPressed]);

  useEffect(() => {
    if (error) {
      setComponentState('error');
      setPressedKeys([]);
      setAnswers([...answers, `ERROR ${pressedKeys} / ${keyStrokes}`]);
    }
    if (success) {
      setComponentState('success');
      setAnswers([...answers, `CORRECTO ${pressedKeys}`]);
      setPressedKeys([]);
    }
    if (!error && !success) {
      setComponentState('inProgress');
    }

    console.info(
      'keyPressed EFFECT ERROR',
      keyPressed,
      'pressedKeys',
      pressedKeys,
      success,
      error,
      componentState
    );

    /*
    return () => {
      console.info(
        'keyPressed EFFECT ERROR AFTER',
        keyPressed,
        'pressedKeys',
        pressedKeys,
        success,
        error,
        componentState
      );
      if (error || success) {
        setPressedKeys([]);
      }
    };
    */
  }, [error, success]);

  console.log(
    '\x1b[35m%s\x1b[0m',
    'keyPressed',
    keyPressed,
    'pressedKeys',
    pressedKeys,
    success,
    error,
    componentState
  );

  // success && setComponentState('success');
  // error && setComponentState('error');
  /*
  const success =
    sameLength(pressedKeys, keyStrokes) && hasSameKeys(pressedKeys, keyStrokes);

  const error = !hasSameKeys(pressedKeys, keyStrokes);

  if (error || success) {
    setComponentState(success ? 'success' : 'error');
  } else {
    setComponentState('inProgress');
  }
  */

  return (
    <div>
      <h1>ShortCutPractice</h1>
      <p>{section}</p>
      <p>{description}</p>
      <p>{note}</p>
      <p>{keyStrokes}</p>

      <p>{componentState === 'success' && '👍'}</p>
      <p>{componentState === 'error' && '👎'}</p>
      <p>{componentState === 'inProgress' && '🏃'}</p>

      {answers.map((answer, idx) => (
        <p key={idx}>{answer}</p>
      ))}
    </div>
  );
}
