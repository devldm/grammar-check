import type { newSolutionSubmission } from "~/server/api/routers/challenges";
import Spacer from "./Spacer";
import SolutionCard from "./SolutionCard";
import useModal from "~/hooks/useModal";

// TODO: look at cleaning up this prop drilling
export default function GridWithTitle({
  title,
  data,
}: {
  title: string;
  data: newSolutionSubmission[];
}) {
  const { openModalId, openModal, closeModal } = useModal();

  return (
    <div className="w-full p-2">
      <h1 className="mb-4 text-4xl">{title}</h1>
      <Spacer height="h-4" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {data
          ? data.map((solution) => {
              return (
                <SolutionCard
                  isInCommentModal={false}
                  solution={solution}
                  key={solution.id}
                  openModalId={openModalId!}
                  openModal={openModal}
                  closeModal={closeModal}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
