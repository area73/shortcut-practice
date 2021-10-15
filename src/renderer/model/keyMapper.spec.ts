import { specialKeyMap } from './keyMapper';

describe('keyMapper', () => {
  describe('When receiving a specialKeyMap', () => {
    it('Should be a Map object with at least one key', () => {
      expect(specialKeyMap.size).toBeGreaterThan(0);
    });
    it('Should have a key for Meta (Command)', () => {
      expect(specialKeyMap.get('Meta')).not.toBeNull();
    });
    it('Should have a key for Alt (Option)', () => {
      expect(specialKeyMap.get('Alt')).not.toBeNull();
    });
    it('Should have a key for Control', () => {
      expect(specialKeyMap.get('Control')).not.toBeNull();
    });
    it('Should have a key for Shift', () => {
      expect(specialKeyMap.get('Shift')).not.toBeNull();
    });
  });
});
