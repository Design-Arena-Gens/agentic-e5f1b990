import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 shadow-header">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
          <span className="text-lg font-bold">DT</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">OWASP Dependency-Track</p>
          <h1 className="text-xl font-bold text-slate-900">Management and Reporting Dashboard</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          v1.0.0
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
            <p className="text-xs text-slate-500">Security Operations</p>
          </div>
          <Image
            src="https://avatars.githubusercontent.com/u/9919?v=4"
            alt="Alex Morgan profile"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
