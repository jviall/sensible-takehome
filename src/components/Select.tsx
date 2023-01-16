import { useId } from "react";
import { ILocation } from "../utils/types";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: ILocation[];
  label: string;
}

export default function Select({ value, onChange, options, label }: Props) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
      <select
        id={id}
        onChange={onChange}
        value={value}
        className="rounded-md p-1"
      >
        {options.map((opt) => (
          <option value={JSON.stringify(opt)} key={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
