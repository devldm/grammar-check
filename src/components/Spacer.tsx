export default function Spacer({
  height,
  width,
}: {
  height?: string;
  width?: string;
}) {
  return <div className={`${width} ${height}`}></div>;
}
