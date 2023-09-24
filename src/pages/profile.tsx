import { useSession } from "next-auth/react";
import Head from "next/head";
import GridWithTitle from "~/components/GridWithTitle";
import Nav from "~/components/Nav";
import SignInOutButton from "~/components/SignInOutButton";
import { UserDataCard } from "~/components/UserDataCard";
import { api } from "~/utils/api";

export default function Profile() {
  const { data: sessionData } = useSession();
  const completed = api.challenges.getAllSubmitted.useQuery();
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#47567c] to-[#15162c] p-4 text-white">
        <UserDataCard data={sessionData} />
        {completed.data && (
          <GridWithTitle title={"Completed challenges"} data={completed.data} />
        )}
        <SignInOutButton data={sessionData} />
      </main>
    </>
  );
}
