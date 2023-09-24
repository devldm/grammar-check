import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function GrammarInput() {
  const [answerState, setAnswerState] = useState("");
  const mutation = api.challenges.postChallenge.useMutation();
  const grammarQuery = api.challenges.getGrammar.useQuery();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    grammarQuery.data?.id &&
      grammarQuery.data.grammar &&
      mutation.mutate({
        solution: answerState,
        grammarId: grammarQuery.data?.id,
        grammar: grammarQuery.data?.grammar,
      });
  }

  return (
    <div className="w-full max-w-[900px] rounded-lg border-gray-200 md:border-2">
      <div className="flex flex-col items-center gap-2 p-4">
        {/* <h1 className="text-center text-xl font-bold tracking-tight text-white sm:text-[5rem] md:text-xl">
            todays grammar is:
          </h1> */}
        {(
          <span className="mt-4 block max-w-full text-3xl text-white md:text-4xl">
            {grammarQuery.data?.grammar}{" "}
          </span>
        ) ?? "oops"}
        <br />
        <form onSubmit={onSubmit} className="w-full">
          <textarea
            name="answer"
            className="w-full rounded-lg border-2 border-gray-600 p-3"
            onChange={(e) => {
              setAnswerState(e?.target.value);
            }}
          />
          <button
            className="mt-3 block w-full rounded-lg bg-blue-300 p-3 text-black"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
