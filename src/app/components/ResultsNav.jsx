import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ResultsNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const p = Math.max(1, Number(params.get("page") ?? 1));

  console.log("++++++++++++++++++++++++++++++++");
  console.log("pathname ", pathname);
  console.log("params", params);
  console.log("params.toString ", params.toString());
  console.log("++++++++++++++++++++++++++++++++");

  const goToPage = (p = 1) => {
    params.set("page", p);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 w-full min-w-4 border-t border-accent py-8 pb-16">
      <button
        className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent"
        onClick={() => (p > 1 ? goToPage(p - 1) : goToPage(p))}
      >
        Prev
      </button>
      <button className="w-fit text-secondary border-b border-secondary p-1 min-w-8 cursor-pointer hover:bg-accent">
        1
      </button>
      <button className="w-fit text-white  border-0 bg-accent p-1 min-w-8 cursor-pointer hover:bg-accent">
        2
      </button>
      <button className="w-fit text-secondary border-b border-secondary p-1 min-w-8 cursor-pointer hover:bg-accent">
        3
      </button>
      <button
        className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent"
        onClick={() => goToPage(p + 1)}
      >
        Next
      </button>
    </div>
  );
}
