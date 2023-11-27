import type { newSolutionSubmission } from "~/server/api/routers/challenges";
import { api } from "~/utils/api";
import Modal from "./Modal";
import useModal from "~/hooks/useModal";

export default function SolutionCard({
  solution,
  isInCommentModal,
}: {
  solution: newSolutionSubmission;
  isInCommentModal: boolean;
}) {
  const { toggleModal, showModal } = useModal();
  const comments = api.challenges.getSolutionComments.useQuery({
    id: solution.id!,
  });
  return (
    <div
      key={solution.id}
      className="flex flex-col justify-between gap-3 rounded-lg border-2 border-gray-300 p-5 md:w-[calc(700px_/_2)]"
    >
      <p className="max-w-max rounded-lg border-2 border-slate-500 bg-slate-800 p-2">
        {solution.grammar}
      </p>

      <p className="text-lg font-bold">{solution.solution}</p>
      <p className="">{solution.solvedAt?.toLocaleDateString()}</p>
      {!isInCommentModal && !showModal && (
        <button
          onClick={() => {
            toggleModal();
          }}
          className="rounded-xl bg-blue-300 p-3 text-black"
        >
          Show comments
        </button>
      )}
      {/* TODO: Remove reliance on non-null operator */}
      {showModal && (
        <Modal
          comments={comments.data!}
          solution={solution}
          toggle={toggleModal}
        />
      )}
    </div>
  );
}
