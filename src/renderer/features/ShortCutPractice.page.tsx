// @ts-nocheck
import { equals, map, whereEq } from 'ramda';
import { useEffect, useState } from 'react';
import { keyTransformed } from 'renderer/model/keyMapper';
import mockData, { KeyStroke, ShortcutAnswered } from '../mock/shortcuts';
import QuestionBlock from './QuestionBlock';
import useKeyPress from './useKeyPress';

export type States = 'error' | 'success' | 'inProgress' | 'done';

export default function ShortCutPractice() {
  // TODO: use useQuery to fetch the data
  const [questionIndex, setQuestionIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<KeyStroke[]>([]);
  const [answers, setAnswers] = useState<ShortcutAnswered[]>([]);
  const [, setComponentState] = useState<States>('inProgress');
  const keyPressed = useKeyPress();

  const question = mockData[questionIndex];

  const error = !whereEq(
    map(keyTransformed)(pressedKeys),
    map(keyTransformed)(question.keyStrokes)
  );

  console.log(error, pressedKeys, map(keyTransformed)(question.keyStrokes)); // --> pressedKeys ==> {objeto KeyK} / --> {code: K}

  const success = equals(
    map(keyTransformed)(pressedKeys),
    map(keyTransformed)(question.keyStrokes)
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    keyPressed && setPressedKeys([...pressedKeys, keyTransformed(keyPressed)]);
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
          {...question}
          pager={`${questionIndex + 1} / ${mockData.length}`}
        />
      </div>
      <div className="answers" style={{ overflow: 'auto', height: '400px' }}>
        {answers
          .map((answer) => (
            <QuestionBlock
              {...question}
              typedKeys={answer.typedKeyStrokes}
              key={question.id}
            />
          ))
          .reverse()}
      </div>
    </>
  );
}
