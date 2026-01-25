export default function ResultsNav({ setQueryParam, queryParam }) {
  const handlePrevPage = () => {
    const params = new URLSearchParams(queryParam);
    const p = Math.max(1, Number(params.get("page") ?? 1));

    if (p > 1) {
      params.set("page", p - 1);
      setQueryParam(params.toString());
    }
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(queryParam);
    const p = Math.max(1, Number(params.get("page") ?? 1));

    params.set("page", p + 1);
    setQueryParam(params.toString());
  };
  return (
    <div className="flex gap-4 w-full min-w-4 border-t border-accent py-8 pb-16">
      <button
        className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent"
        onClick={() => handlePrevPage()}
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
        onClick={() => handleNextPage()}
      >
        Next
      </button>
    </div>
  );
}
