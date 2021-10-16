import { useEffect, useState } from 'react';
import { keyFormattedGroup } from 'renderer/model/keyMapper';
import { hasSameKeys, sameLength } from '../common/utils';
import mockData, { ShortcutAnswered } from '../mock/shortcuts';
import QuestionBlock from './QuestionBlock';
import useKeyPress from './useKeyPress';

export type States = 'error' | 'success' | 'inProgress' | 'done';

export default function ShortCutPractice() {
  // TODO: use useQuery to fetch the data
  const [questionIndex, setQuestionIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<ShortcutAnswered[]>([]);
  const [, setComponentState] = useState<States>('inProgress');
  const keyPressed = useKeyPress();

  const question = mockData[questionIndex];

  const error = !hasSameKeys(pressedKeys, question.keyStrokes);

  const success =
    sameLength(pressedKeys, question.keyStrokes) &&
    hasSameKeys(pressedKeys, question.keyStrokes);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    keyPressed && setPressedKeys([...pressedKeys, keyPressed]);
  }, [keyPressed]);

  const getNextQuestion = () =>
    questionIndex < mockData.length - 1 ? questionIndex + 1 : questionIndex;

  const combineAnswers = () => [
    ...answers,
    { ...question, typedKeyStrokes: pressedKeys },
  ];

  const effectError = () => {
    setComponentState('error');
    setPressedKeys([]);
    setQuestionIndex(getNextQuestion());
    setAnswers(combineAnswers);
  };

  const effectSuccess = () => {
    setComponentState('success');
    setQuestionIndex(getNextQuestion());
    setAnswers(combineAnswers);
    setPressedKeys([]);
  };

  const effectInProgress = () => {
    setComponentState('inProgress');
  };

  useEffect(() => {
    error && effectError();
    success && effectSuccess();
    !error && !success && effectInProgress();
  }, [error, success]);

  return (
    <>
      <div>
        <QuestionBlock
          description={question.description}
          section={question.section}
          pager={`${questionIndex + 1} / ${mockData.length}`}
          note={question.note}
          keyStrokes={keyFormattedGroup(question.keyStrokes)}
        />
      </div>
      <div className="answers" style={{ overflow: 'auto', height: '400px' }}>
        {answers
          .map((answer) => (
            <div
              key={answer.id}
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
          ))
          .reverse()}
      </div>
    </>
  );
}
