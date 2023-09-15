// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GridWithTitle({
  title,
  data,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl">{title}</h1>
      <div>
        {data
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            data.map((d) => {
              return <p key={d.id}>{d.solution}</p>;
            })
          : null}
      </div>
    </div>
  );
}
