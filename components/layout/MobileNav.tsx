"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard", icon: "🏠", label: "Home" },
  { href: "/search", icon: "🔍", label: "Search" },
  { href: "/timeline", icon: "📅", label: "Timeline" },
  { href: "/notifications", icon: "🔔", label: "Alerts", badge: 3 },
  { href: "/profile", icon: "👤", label: "Profile" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary border-t border-border mobile-nav" aria-label="Mobile navigation">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all relative
                ${active ? "text-accent-orange" : "text-text-secondary"}`}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-xl relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
