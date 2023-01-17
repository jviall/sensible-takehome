import { useId } from "react";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export default function Search({ value, onChange, label }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-label="search"
        type="text"
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-neutral-700 px-2 py-1 rounded-md"
        placeholder="Search"
      />
    </div>
  );
}
