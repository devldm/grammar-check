import { type FormEvent, useState, useEffect } from "react";
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

  useEffect(() => {
    if (!mutation.isLoading && !mutation.isError && mutation.isSuccess) {
      alert("You have completed the challenge!");
    } else {
      if (mutation.isError) {
        alert("Sorry that failed. Please try again");
      }
    }
  }, [mutation.isError, mutation.isLoading, mutation.isSuccess]);

  return (
    <div className="w-full max-w-[900px] rounded-lg  md:mt-6">
      <div className="flex flex-col items-center gap-4 p-4">
        {(
          <span className="mt-4 block max-w-full text-3xl text-white md:text-4xl">
            {grammar.grammar}{" "}
          </span>
        ) ?? "oops"}
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-center"
          id="grammar-form"
        >
          <textarea
            name="answer"
            className="w-full rounded-lg border-2 border-gray-600 p-3  text-black md:w-[50%]"
            value={answerState}
            onChange={(e) => {
              setAnswerState(e?.target.value);
            }}
          />
          <button
            className="mt-3 block w-full rounded-lg bg-blue-300 p-3 text-black hover:bg-blue-400 md:w-[50%]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
