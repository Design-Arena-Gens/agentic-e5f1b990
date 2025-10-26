import { ShieldCheckIcon, ChartBarIcon, FolderIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", icon: ShieldCheckIcon, current: true },
  { name: "Projects", icon: FolderIcon, current: false },
  { name: "Reports", icon: ChartBarIcon, current: false },
  { name: "Settings", icon: Cog6ToothIcon, current: false }
];

export function Sidebar() {
  return (
    <nav
      className="flex h-full flex-col justify-between border-r border-slate-200 bg-white px-6 py-8"
      aria-label="Primary"
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Navigation</p>
          <ul className="mt-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    item.current
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-primary-50 p-4 text-sm text-primary-800" role="note">
          <p className="font-semibold">Global Risk Summary</p>
          <p className="mt-2 leading-6">
            Critical attack surfaces reduced by 12% in the last quarter. Maintain momentum by closing pending CVEs.
          </p>
          <a href="#reporting" className="mt-3 inline-flex items-center text-sm font-semibold text-primary-700">
            View reporting →
          </a>
        </div>
      </div>
      <div className="space-y-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} OWASP Dependency-Track</p>
        <a href="#" className="hover:text-slate-700">
          Security policies
        </a>
      </div>
    </nav>
  );
}
