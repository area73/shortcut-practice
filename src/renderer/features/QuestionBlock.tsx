import { FC } from 'react';
import { Shortcut } from 'renderer/mock/shortcuts';
import { keyFormattedGroup } from 'renderer/model/keyMapper';
import MaybeBlock from './MaybeBlock';
import classnames from 'classNames';

import './QuestionBlock.scss';
import { always, cond, equals } from 'ramda';

export type QuestionBlockProps = Partial<Shortcut> & {
  pager?: string;
  typedKeys?: string;
};

const QuestionBlock: FC<QuestionBlockProps> = ({
  pager,
  section,
  description,
  note,
  keyStrokes,
  typedKeys,
}) => {

  const bgColor = cond([
    [equals(keyStrokes === typedKeys), always('bg-green-200')],
    [equals(keyStrokes !== typedKeys), always('bg-green-200')],
    [equals(true), always('')],
  ]);

  const classNames = classnames(
    'questionBlock',
    'shadow-lg',
    'box-content',
    'h-32',
    'w-32',
    'p-4',
    'border-4',
     bgColor
  );

  return (
    <div className={classNames}>
      <MaybeBlock className="questionBlock_pager">{pager}</MaybeBlock>
      <MaybeBlock className="questionBlock_section">{section}</MaybeBlock>
      <MaybeBlock className="questionBlock_description">
        {description}
      </MaybeBlock>
      <MaybeBlock className="questionBlock_note">{note}</MaybeBlock>
      <MaybeBlock className="questionBlock_keyStrokes">
        {keyStrokes && keyFormattedGroup(keyStrokes)}
      </MaybeBlock>
      <MaybeBlock className="questionBlock_keyStrokes">
        {typedKeys && keyFormattedGroup([])}
      </MaybeBlock>
    </div>
  );
};

export { QuestionBlock as default };
