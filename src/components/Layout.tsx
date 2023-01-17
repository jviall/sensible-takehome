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
        h-full w-full grid justify-items-center items-start
        grid-cols-[1fr_minmax(360px,2fr)_1fr]
        grid-rows-[5rem_1fr_1.5rem]
        h-[100vh]
        `}
    >
      <div className="pt-4 pb-2 row-start-1 col-start-2 col-span-1 justify-self-center self-center">
        {header}
      </div>
      <div className="row-start-2 col-start-2 col-span-1 w-full px-6">
        {main}
      </div>
      {/* content borders */}
      <div className="h-full col-start-1 border-r-[1px] border-stone-300 dark:border-zinc-700 row-start-1 row-span-3 justify-self-end" />
      <div className="h-full col-start-3 border-l-[1px] border-stone-300 dark:border-zinc-700 row-start-1 row-span-3 justify-self-start" />
    </div>
  );
}
