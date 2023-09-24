import type { Session } from "next-auth";

export function UserDataCard({ data }: { data: Session | null }) {
  return (
    <div className="w-full border-b-2 p-4">
      <h1 className="text-4xl font-bold">{data?.user.name}</h1>
      <p className="text-lg">Korean: Intermediate English: Native</p>
    </div>
  );
}
