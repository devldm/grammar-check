import type { newSolutionSubmission } from "~/server/api/routers/challenges";

export default function GridWithTitle({
  title,
  data,
}: {
  title: string;
  data: newSolutionSubmission[];
}) {
  return (
    <div className="w-full p-2">
      <h1 className="mb-4 text-2xl">{title}</h1>
      <div className="flex flex-col gap-3 md:flex md:flex-row md:flex-wrap md:gap-4">
        {data
          ? data.map((solution) => {
              return (
                <div
                  key={solution.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border-2 border-gray-300 p-5 md:w-[calc(830px_/_2)]"
                >
                  <p className="max-w-max rounded-lg border-2 border-slate-500 bg-slate-800 p-2">
                    {solution.grammar}
                  </p>

                  <p className="text-lg font-bold">{solution.solution}</p>
                  <p className="">{solution.solvedAt?.toLocaleDateString()}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
