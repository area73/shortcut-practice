import { useEffect, useState } from 'react';
import { sameLength, hasSameKeys } from '../common/utils';
import useKeyPress from './useKeyPress';

import mockData, { ShortcutAnswered } from '../mock/shortcuts';

export type States = 'error' | 'success' | 'inProgress' | 'done';

export default function ShortCutPractice() {
  // TODO: use useQuery to fetch the data
  /*
  // Access the client
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery('shortcutsData', () =>
    fetch('../mock/shortcuts.ts').then((res) => res.json())
  );
  */

  const [questionIndex, setQuestionIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<ShortcutAnswered[]>([]);
  const [componentState, setComponentState] = useState<States>('inProgress');
  const keyPressed = useKeyPress();

  const question = mockData[questionIndex];

  const error = !hasSameKeys(pressedKeys, question.keyStrokes);

  // error && setQuestionIndex(questionIndex + 1);

  const success =
    sameLength(pressedKeys, question.keyStrokes) &&
    hasSameKeys(pressedKeys, question.keyStrokes);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    keyPressed && setPressedKeys([...pressedKeys, keyPressed]);
  }, [keyPressed]);

  useEffect(() => {
    if (error) {
      setComponentState('error');
      setPressedKeys([]);
      setQuestionIndex(questionIndex + 1);
      setAnswers([...answers, { ...question, typedKeyStrokes: pressedKeys }]);
    }
    if (success) {
      setComponentState('success');
      setQuestionIndex(questionIndex + 1);
      setAnswers([...answers, { ...question, typedKeyStrokes: pressedKeys }]);
      setPressedKeys([]);
    }
    if (!error && !success) {
      setComponentState('inProgress');
    }
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

  return (
    <div>
      <h1>ShortCutPractice</h1>
      <p>{question.section}</p>
      <p>{question.description}</p>
      <p>{question.note}</p>
      <p>{question.keyStrokes}</p>

      <div className="answers" style={{ overflow: 'auto', height: '400px' }}>
        {answers
          .map(
            (
              answer,
              idx // FIXME: how to get uniqyue idx
            ) => (
              <div
                key={answer.id + idx}
                style={{
                  border: '1px solid #000',
                  backgroundColor:
                    JSON.stringify(answer.keyStrokes) ===
                    JSON.stringify(answer.typedKeyStrokes)
                      ? '#0f0'
                      : '#f00',
                }}
              >
                <p>section: {answer.section}</p>
                <p>description: {answer.description}</p>
                <p>note: {answer.note}</p>
                <p>keyStrokes: {answer.keyStrokes}</p>
                <p>typedKeyStrokes: {answer.typedKeyStrokes}</p>
              </div>
            )
          )
          .reverse()}
      </div>
    </div>
  );
}
