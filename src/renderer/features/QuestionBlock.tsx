import { FC } from 'react';
import { Shortcut } from 'renderer/mock/shortcuts';
import { keyFormattedGroup } from 'renderer/model/keyMapper';
import MaybeBlock from './MaybeBlock';

import './QuestionBlock.scss';

export type QuestionBlockProps = Partial<Shortcut> & {
  pager?: string;
};

const QuestionBlock: FC<QuestionBlockProps> = ({
  pager,
  section,
  description,
  note,
  keyStrokes,
}) => {
  return (
    <div className="questionBlock shadow-lg box-content h-32 w-32 p-4 border-4 ">
      <MaybeBlock className="questionBlock_pager">{pager}</MaybeBlock>
      <MaybeBlock className="questionBlock_section">{section}</MaybeBlock>
      <MaybeBlock className="questionBlock_description">
        {description}
      </MaybeBlock>
      <MaybeBlock className="questionBlock_note">{note}</MaybeBlock>
      <MaybeBlock className="questionBlock_keyStrokes">
        {keyStrokes && keyFormattedGroup(keyStrokes)}
      </MaybeBlock>
    </div>
  );
};

export { QuestionBlock as default };
