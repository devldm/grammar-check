import type { newSolutionSubmission } from "~/server/api/routers/challenges";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GridWithTitle({
  title,
  data,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: newSolutionSubmission[];
}) {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl">{title}</h1>
      <div>
        {data
          ? data.map((solution) => {
              return (
                <div
                  key={solution.id}
                  className="rounded-lg border-2 border-gray-300 p-5"
                >
                  <p>{solution.grammar}</p>
                  <p>{solution.solution}</p>
                  <p>{solution.solvedAt?.toLocaleDateString()}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
