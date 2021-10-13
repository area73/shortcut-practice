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

export default mockData;
