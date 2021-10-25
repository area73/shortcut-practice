import { keyFormattedGroup } from './keyMapper';

describe('keyMapper', () => {
  describe('When keyFormattedGroup', () => {
    const keyMaps = [
      {
        code: 'keyK',
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
      },
      {
        code: 'keyK',
        ctrlKey: true,
        metaKey: true,
        shiftKey: true,
        altKey: true,
      },
    ];
    // TODO
    it('should replace metaKey with simbol', () => {
      expect(keyFormattedGroup(keyMaps)).toBe('');
    });
  });
});
