import { type FormEvent, useEffect, useState } from "react";
import { type comments } from "types/grammar";
import { api } from "~/utils/api";

export default function Modal({
  comments,
  solutionId,
}: {
  comments: comments;
  solutionId: number;
}) {
  const [commentState, setCommentState] = useState("");
  const mutation = api.challenges.postComment.useMutation();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (commentState) {
      mutation.mutate({
        solutionId: solutionId,
        comment: commentState,
      });
    }
    setCommentState("");
  }

  useEffect(() => {
    if (!mutation.isLoading && !mutation.isError && mutation.isSuccess) {
      alert("Comment submitted");
    } else {
      if (mutation.isError) {
        alert("Sorry that failed. Please try again");
      }
    }
  }, [mutation.isError, mutation.isLoading, mutation.isSuccess]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#121212] p-6">
      <h1>Comments</h1>
      <form action="submit" onSubmit={onSubmit}>
        <input
          placeholder="Leave a comment"
          type="text"
          value={commentState}
          onChange={(e) => setCommentState(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-600 p-3  text-black"
        />
        <button type="submit" className="rounded-xl bg-blue-300 p-3 text-black">
          Comment
        </button>
      </form>
      {comments?.map((comment) => {
        return (
          <div key={comment.commentId} className="border-1 w-full border-white">
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
