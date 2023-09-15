import type { Session } from "next-auth";

export function UserDataCard({ data }: { data: Session | null }) {
  return (
    <div className="p8-4 w-full border-b-2 p-6">
      <h1 className="text-4xl font-bold">{data?.user.name}</h1>
      <p className="text-lg">Korean: Intermediate English: Native</p>
    </div>
  );
}
