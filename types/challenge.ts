export type challenge = {
  id: number;
  answer: string;
  comments: comment[];
};

type comment = {
  upVote: number;
  downVote: number;
  comment: string;
};
