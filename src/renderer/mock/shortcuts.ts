export type Shortcut = {
  id: string;
  description: string;
  note: string;
  keyStrokes: KeyStroke[];
  section: string;
};

export type KeyStroke = {
  code: string;
  ctrlKey?: boolean | string;
  metaKey?: boolean | string;
  shiftKey?: boolean | string;
  altKey?: boolean | string;
};

export type ShortcutAnswered = Shortcut & {
  typedKeyStrokes: KeyStroke[];
};

const mockData: Shortcut[] = [
  {
    id: '0',
    description: 'Keyboard TEST',
    note: 'esto son unas notas',
    keyStrokes: [{ code: 'KeyK' }, { code: 'KeyS' }],
    section: 'General',
  },
  {
    id: '1',
    description: 'segundo',
    note: 'notas del segundo',
    keyStrokes: [
      { code: 'KeyK', metaKey: true },
      { code: 'KeyS', metaKey: true },
    ],
    section: 'General',
  },
  {
    id: '2',
    description: 'Fold all regions',
    note: '',
    keyStrokes: [
      {
        code: 'KeyK',
        metaKey: true,
        altKey: true,
        ctrlKey: true,
        shiftKey: true,
      },
    ],
    section: 'Basic Editing',
  },
  {
    id: '3',
    description: 'Unfold all regions',
    note: '',
    keyStrokes: [
      { code: 'KeyS', shiftKey: true },
      { code: 'KeyS', ctrlKey: true },
    ],
    section: 'Basic Editing',
  },
];

export default mockData;
