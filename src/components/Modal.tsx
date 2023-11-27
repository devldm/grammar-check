import { type FormEvent, useEffect, useState } from "react";
import { type comments } from "types/grammar";
import { api } from "~/utils/api";
import SolutionCard from "./SolutionCard";
import { type newSolutionSubmission } from "~/server/api/routers/challenges";
import CrossIcon from "./icons/CrossIcon";

export default function Modal({
  comments,
  solution,
  closeModal,
}: {
  comments: comments;
  solution: newSolutionSubmission;
  closeModal: () => void;
}) {
  const [commentState, setCommentState] = useState("");
  const mutation = api.challenges.postComment.useMutation();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (commentState && solution) {
      mutation.mutate({
        solutionId: solution.id!,
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
    <div className="absolute left-1/2 top-1/2 flex max-h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-[#201e1e] p-8 md:w-[40%] ">
      <button
        className="w-min items-end rounded-xl p-1 text-white hover:cursor-pointer"
        onClick={() => {
          closeModal();
        }}
      >
        <CrossIcon />
      </button>
      <div className="flex w-full flex-col items-center justify-center gap-4 overflow-auto">
        <SolutionCard solution={solution} isInCommentModal={true} />
        <h1 className="text-xl">Comments</h1>
        <form action="submit" onSubmit={onSubmit}>
          <input
            placeholder="Leave a comment"
            type="text"
            value={commentState}
            onChange={(e) => setCommentState(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-600 p-3  text-black"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-300 p-3 text-black"
          >
            Comment
          </button>
        </form>
        <div className="grid grid-cols-1 gap-2 overflow-auto md:grid-cols-2">
          {comments?.map((comment) => {
            return (
              <div
                key={comment.commentId}
                className="h-24 w-full rounded-lg border-2 border-solid border-white p-3"
              >
                <p>{comment.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
