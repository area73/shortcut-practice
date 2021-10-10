import { SyntheticEvent } from 'react';
import useKeyPress from './useKeyPress';

type Shortcut = {
  key: string;
  description: string;
  note: string;
  keyStroke: string;
  section: string;
};

const mockData: Shortcut[] = [
  {
    key: '1',
    description: 'Keyboard Shortcuts',
    note: '',
    keyStroke: '⌘K ⌘S',
    section: 'General',
  },
  {
    key: '2',
    description: 'Fold all regions',
    note: '',
    keyStroke: '⌘K ⌘9',
    section: 'Basic Editing',
  },
  {
    key: '3',
    description: 'Unfold all regions',
    note: '',
    keyStroke: '⌘K ⌘0 ',
    section: 'Basic Editing',
  },
];

export default function ShortCutPractice() {
  const { description, note, keyStroke, section } = mockData[0];

  const happyPress = useKeyPress('h');

  const checkValue = (ev: SyntheticEvent<HTMLInputElement>) => {
    console.log(ev.currentTarget.value);
  };
  return (
    <div>
      <h1>ShortCutPractice</h1>
      <p>{section}</p>
      <p>{description}</p>
      <p>{note}</p>
      <input autoFocus type="text" onChange={checkValue} />
      <p>
        {keyStroke}
        {happyPress}
      </p>
    </div>
  );
}
