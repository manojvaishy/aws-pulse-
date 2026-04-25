"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUser, clearUser, getInitials, type UserProfile } from "@/lib/userStore";
import { initNotifications, getUnreadCount } from "@/lib/notificationStore";

const ROLE_ICONS: Record<string, string> = {
  DevOps: "⚙️", Developer: "💻", Architect: "🏗️", "Data Engineer": "📊",
  SRE: "🔧", "ML Engineer": "🤖", "Security Engineer": "🛡️", FinOps: "💰",
};

const NAV_BASE = [
  { href: "/dashboard",     icon: "🏠", label: "Dashboard" },
  { href: "/search",        icon: "🔍", label: "Search" },
  { href: "/timeline",      icon: "📅", label: "Timeline" },
  { href: "/notifications", icon: "🔔", label: "Notifications" },
  { href: "/admin",         icon: "📊", label: "Admin Analytics" },
  { href: "/settings",      icon: "⚙️", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    // Init notifications and get unread count
    const role = u?.role || localStorage.getItem("aws_pulse_role") || "DevOps";
    const notifs = initNotifications(role);
    setUnreadCount(getUnreadCount(notifs));
  }, [pathname]); // refresh on route change

  const initials = user?.name ? getInitials(user.name) : user?.email?.slice(0, 2).toUpperCase() || "?";
  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  const displayRole = user?.role || "Engineer";

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-bg-secondary border-r border-border fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold text-text-primary">AWS Pulse</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
        {NAV_BASE.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const badge = item.href === "/notifications" && unreadCount > 0 ? unreadCount : null;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? "bg-orange-500/10 text-accent-orange border-l-2 border-accent-orange pl-[10px]"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"}`}
              aria-current={active ? "page" : undefined}>
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <Link href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-hover transition-all group"
          aria-label="Go to profile">
          <div className="w-9 h-9 rounded-full bg-accent-orange flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
            <p className="text-xs text-text-secondary truncate">
              {ROLE_ICONS[displayRole]} {displayRole}
            </p>
          </div>
          <span className="text-text-secondary group-hover:text-text-primary text-sm">⚙️</span>
        </Link>
        <button onClick={handleLogout}
          className="w-full mt-2 px-3 py-2 text-xs text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-left"
          aria-label="Log out">
          ← Log out
        </button>
      </div>
    </aside>
  );
}
