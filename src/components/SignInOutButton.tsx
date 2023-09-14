import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function SignInOutButton({ data }: { data: Session | null }) {
  return (
    <button
      className="rounded-xl bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={
        data
          ? () => void signOut()
          : () =>
              void signIn(
                "discord",
                { callbackUrl: "/SignedInHome", redirect: true },
                { prompt: "none" },
              )
      }
    >
      {data ? "Sign out" : "Sign in"}
    </button>
  );
}
