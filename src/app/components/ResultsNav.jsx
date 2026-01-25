export default function ResultsNav() {
  return (
    <div className="flex gap-4 w-full min-w-4 border-t border-accent py-8 pb-16">
      <button className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent">
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
      <button className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent">
        Next
      </button>
    </div>
  );
}
