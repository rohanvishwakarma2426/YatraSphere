import { useSearchParams } from "react-router-dom";

export default function Experiences() {
  const [params] = useSearchParams();

  return (
    <h1 className="text-3xl p-10">
      Experience : {params.get("q")}
    </h1>
  );
}