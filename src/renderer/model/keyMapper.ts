import { fromNullable } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";

const specialKeyMap = new Map<string, string>()
  .set('Shift', '⇧')
  .set('Alt', '⌥')
  .set('Control', '⌃')
  .set('Meta', '⌘');



  // getMap :: Map<A,A> -> A -> A | undefined
  const getMap = (keyMap: Map<unknown, unknown>) => (compare: unknown): unknown | undefined =>
  keyMap.get(compare);

  const getValueFromSpecialKeyMap = getMap(specialKeyMap);

 export const keyFormatted = (key:unknown) => flow(
    getValueFromSpecialKeyMap,
    fromNullable(key)
    )(key);



export { specialKeyMap };
