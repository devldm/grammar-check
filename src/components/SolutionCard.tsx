import type { newSolutionSubmission } from "~/server/api/routers/challenges";
import { api } from "~/utils/api";
import Modal from "./Modal";
import CommentIcon from "./icons/CommentIcon";
import { useEffect, useState } from "react";

export default function SolutionCard({
  solution,
  isInCommentModal,
  openModalId,
  openModal,
  closeModal,
}: {
  solution: newSolutionSubmission;
  isInCommentModal: boolean;
  openModalId?: number;
  openModal?: (id: number) => void;
  closeModal?: () => void;
}) {
  const comments = api.challenges.getSolutionComments.useQuery({
    id: solution.id!,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(openModalId === solution.id);
  }, [openModalId, solution.id]);

  return (
    <div
      key={solution.id}
      className="flex flex-col justify-between gap-3 rounded-lg border-2 border-gray-300 p-5 md:w-[calc(700px_/_2)]"
    >
      <p className="max-w-max rounded-lg border-2 border-slate-500 bg-slate-800 p-2">
        {solution.grammar}
      </p>

      <p className="text-lg font-bold">{solution.solution}</p>
      <div className="flex w-full justify-between">
        <p className="">{solution.solvedAt?.toLocaleDateString()}</p>

        {!isInCommentModal && openModal && (
          <button
            onClick={() => {
              openModal(solution.id!);
            }}
            className="flex w-min gap-2 rounded-xl text-white"
          >
            <CommentIcon />{" "}
            {comments.data && comments.data?.length > 0
              ? comments.data?.length
              : null}
          </button>
        )}
      </div>
      {/* TODO: Remove reliance on non-null operator */}
      {showModal && (
        <Modal
          comments={comments.data!}
          solution={solution}
          closeModal={closeModal!}
        />
      )}
    </div>
  );
}
