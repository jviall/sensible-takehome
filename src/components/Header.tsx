interface Props {
  text: string;
}
export default function Header({ text }: Props) {
  return <h1 className="text-3xl">{text}</h1>;
}
