import { useSession } from "next-auth/react";
import Head from "next/head";
import Nav from "~/components/Nav";
import SignInOutButton from "~/components/SignInOutButton";

import SignedInHome from "./SignedInHome";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Grammar check</title>
        <meta
          name="description"
          content="GrammarCheck - Practice Korean grammar"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav isSignedIn={Boolean(sessionData)} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4462af] to-[#15162c]">
        {sessionData ? (
          <SignedInHome />
        ) : (
          <div className="md:items-left container flex flex-col items-center justify-center gap-5 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Welcome to{" "}
              <span className="text-[hsl(280,100%,70%)]">GrammarCheck</span>
            </h1>
            <p className="text-lg italic text-white md:text-2xl">
              Your home for Korean grammar challenges
            </p>
            <div className="flex flex-col items-center gap-2">
              <SignInOutButton data={sessionData} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
