import type { newSolutionSubmission } from "~/server/api/routers/challenges";
import Spacer from "./Spacer";
import SolutionCard from "./SolutionCard";

// TODO: look at cleaning up this prop drilling
export default function GridWithTitle({
  title,
  data,
}: {
  title: string;
  data: newSolutionSubmission[];
}) {
  return (
    <div className="w-full p-2">
      <h1 className="mb-4 text-4xl">{title}</h1>
      <Spacer height="h-4" />
      <div className="flex flex-col justify-center gap-3 md:flex md:flex-row md:flex-wrap md:gap-4">
        {data
          ? data.map((solution) => {
              return (
                <SolutionCard
                  isInCommentModal={false}
                  solution={solution}
                  key={solution.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
