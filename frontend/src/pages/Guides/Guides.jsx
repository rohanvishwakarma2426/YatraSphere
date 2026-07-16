import { useSearchParams } from "react-router-dom";

export default function Guides() {
  const [params] = useSearchParams();

  return (
    <h1 className="text-3xl p-10">
      Guide : {params.get("q")}
    </h1>
  );
}