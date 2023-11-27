export type grammarType = {
  id: number;
  grammar: string;
};

export type commentType = {
  commentId: number;
  solutionId: number;
  comment: string;
  commentingUserId: string;
  createdAt: Date | null;
};

export type comments = commentType[];
