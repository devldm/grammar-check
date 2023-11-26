import { useSession } from "next-auth/react";
import Head from "next/head";
import GridWithTitle from "~/components/GridWithTitle";
import Nav from "~/components/Nav";
import SignInOutButton from "~/components/SignInOutButton";
import Spacer from "~/components/Spacer";
import { UserDataCard } from "~/components/UserDataCard";
import { api } from "~/utils/api";

export default function Profile() {
  const { data: sessionData } = useSession();
  const completedChallenges = api.challenges.getAllSubmittedByUser.useQuery();

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="GrammarCheck profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav isSignedIn={Boolean(sessionData)} />
      <main className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-[#47567c] to-[#15162c] p-4 text-white">
        <div className="xl:max-w-[60%]">
          <UserDataCard data={sessionData} />
          <Spacer height="h-8" />
          {completedChallenges.data && (
            <GridWithTitle
              title={"Completed challenges"}
              data={completedChallenges.data}
            />
          )}
          <SignInOutButton data={sessionData} />
        </div>
      </main>
    </>
  );
}
