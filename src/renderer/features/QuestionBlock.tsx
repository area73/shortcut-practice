import { FC } from 'react';

export type Question = {
  pager?: string;
  section?: string;
  description: string;
  note?: string;
  keyStrokes?: string;
};

const Block = (content) => <p classN

const QuestionBlock: FC<Question> = ({
  pager,
  section,
  description,
  note,
  keyStrokes,
}) => {
  return (
    <div>
      <p>{pager}</p>
      <p>{section}</p>
      <p>{description}</p>
      <p>{note}</p>
      <p>{keyStrokes}</p>
    </div>
  );
};

export { QuestionBlock as default };
