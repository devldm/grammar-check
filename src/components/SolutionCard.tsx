import { useState } from "react";
import type { newSolutionSubmission } from "~/server/api/routers/challenges";
import { api } from "~/utils/api";
import Modal from "./Modal";

export default function SolutionCard({
  solution,
}: {
  solution: newSolutionSubmission;
}) {
  const [showModal, setShowModal] = useState(false);
  const comments = api.challenges.getSolutionComments.useQuery({
    id: solution.id!,
  });

  console.log(comments.data);
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
      <button
        onClick={() => setShowModal(!showModal)}
        className="rounded-xl bg-blue-300 p-3 text-black"
      >
        Show comments
      </button>
      {/* TODO: Remove reliance on non-null operator */}
      {showModal && (
        <Modal comments={comments.data!} solutionId={solution.id!} />
      )}
    </div>
  );
}
