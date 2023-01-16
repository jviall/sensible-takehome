import { ReactNode } from "react";

interface Props {
  header: ReactNode;
  main: ReactNode;
}
export default function Layout({ header, main }: Props) {
  return (
    <div
      id="container"
      className={`
        h-full w-full grid justify-items-center
        grid-cols-[1fr_minmax(300px,2fr)_1fr]
        grid-rows-[3rem_1fr_40px]`}
    >
      <div className="col-start-2 col-span-1 self-center">{header}</div>
      <div className="col-start-2 col-span-1 w-full self-center">{main}</div>
    </div>
  );
}
