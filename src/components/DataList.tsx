interface Props<T> {
  data: T[];
  /** should return a data-derived unique string */
  getItemKey: (item: T) => string;
  children: (item: T, index: number) => JSX.Element;
  label: string;
}

export default function DataList<T = unknown>({
  data,
  getItemKey,
  children,
  label,
}: Props<T>) {
  return (
    <article className="self-center mt-6 w-full flex flex-col gap-4">
      <h2 className="text-lg text-center">{label}</h2>
      {data && (
        <ul className="w-full">
          {data.map((item, index) => (
            <li key={getItemKey(item)} className="mb-4">
              {children(item, index)}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
