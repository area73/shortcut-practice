import { FC } from 'react';
import MaybeBlock from './MaybeBlock';

import './QuestionBlock.scss';

export type Question = {
  pager?: string;
  section?: string;
  description: string;
  note?: string;
  keyStrokes?: string;
};

const QuestionBlock: FC<Question> = ({
  pager,
  section,
  description,
  note,
  keyStrokes,
}) => {
  return (
    <div className="questionBlock">
      <MaybeBlock className="questionBlock_pager">{pager}</MaybeBlock>
      <MaybeBlock className="questionBlock_section">{section}</MaybeBlock>
      <MaybeBlock className="questionBlock_description">
        {description}
      </MaybeBlock>
      <MaybeBlock className="questionBlock_note">{note}</MaybeBlock>
      <MaybeBlock className="questionBlock_keyStrokes">{keyStrokes}</MaybeBlock>
    </div>
  );
};

export { QuestionBlock as default };
