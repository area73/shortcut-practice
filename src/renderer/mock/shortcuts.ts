export type Shortcut = {
  id: string;
  description: string;
  note: string;
  keyStrokes: string[][];
  section: string;
};

export type ShortcutAnswered = Shortcut & {
  typedKeyStrokes: string[][];
};

const mockData: Shortcut[] = [
  {
    id: '0',
    description: 'Keyboard TEST',
    note: '',
    keyStrokes: [['KeyK'], ['KeyS']],
    section: 'General',
  },
  {
    id: '1',
    description: 'segundo',
    note: 'notas del segundo',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'KeyS'],
    ],
    section: 'General',
  },
  {
    id: '2',
    description: 'Fold all regions',
    note: '',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'Digit9'],
    ],
    section: 'Basic Editing',
  },
  {
    id: '3',
    description: 'Unfold all regions',
    note: '',
    keyStrokes: [
      ['metaKey', 'KeyK'],
      ['metaKey', 'Key0'],
    ],
    section: 'Basic Editing',
  },
];

export default mockData;
