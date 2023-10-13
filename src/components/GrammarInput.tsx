import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { type grammarType } from "types/grammar";

export default function GrammarInput({ grammar }: { grammar: grammarType }) {
  const [answerState, setAnswerState] = useState("");
  const mutation = api.challenges.postChallenge.useMutation();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (grammar) {
      mutation.mutate({
        solution: answerState,
        grammarId: grammar.id,
        grammar: grammar.grammar,
      });
    }

    setAnswerState("");
  }

  return (
    <div className="w-full max-w-[900px] rounded-lg border-gray-200 md:mt-6 md:border-2">
      <div className="flex flex-col items-center gap-2 p-4">
        {(
          <span className="mt-4 block max-w-full text-3xl text-white md:text-4xl">
            {grammar.grammar}{" "}
          </span>
        ) ?? "oops"}
        <br />
        <form onSubmit={onSubmit} className="w-full" id="grammar-form">
          <textarea
            name="answer"
            className="w-full rounded-lg border-2 border-gray-600 p-3 text-black"
            value={answerState}
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
