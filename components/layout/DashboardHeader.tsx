"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getUser, getInitials, type UserProfile } from "@/lib/userStore";
import { initNotifications, getUnreadCount } from "@/lib/notificationStore";
import { useToast } from "@/components/ui/Toast";

export default function DashboardHeader() {
  const [lang, setLang] = useState<"EN" | "HI" | "HG">("EN");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (u?.language) {
      const map: Record<string, "EN" | "HI" | "HG"> = { en: "EN", hi: "HI", hg: "HG" };
      setLang(map[u.language] || "EN");
    }
    const role = u?.role || localStorage.getItem("aws_pulse_role") || "DevOps";
    const notifs = initNotifications(role);
    setUnreadCount(getUnreadCount(notifs));
  }, [pathname]);

  const initials = user?.name ? getInitials(user.name) : user?.email?.slice(0, 2).toUpperCase() || "?";

  const handleLangSwitch = (l: "EN" | "HI" | "HG") => {
    setLang(l);
    const map: Record<string, string> = { EN: "en", HI: "hi", HG: "hg" };
    localStorage.setItem("aws_pulse_language", map[l]);
    showToast(`🌐 Switched to ${l}`, "info");
  };

  return (
    <header className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-md border-b border-border px-4 lg:px-6 py-3">
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={() => router.push("/search")}
          className="flex-1 flex items-center gap-3 bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-text-secondary hover:border-accent-orange/50 transition-all"
          aria-label="Open search">
          <span className="text-sm">🔍</span>
          <span className="text-sm flex-1 text-left">Search EC2, Lambda, deprecation...</span>
          <span className="hidden sm:flex items-center gap-1 text-xs bg-bg-card px-2 py-0.5 rounded border border-border text-text-secondary">
            <span>⌘</span><span>K</span>
          </span>
        </button>

        {/* Language toggle */}
        <div className="hidden sm:flex items-center bg-bg-secondary border border-border rounded-lg p-1 gap-0.5" role="group" aria-label="Language selection">
          {(["EN", "HI", "HG"] as const).map((l) => (
            <button key={l} onClick={() => handleLangSwitch(l)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${lang === l ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
              aria-pressed={lang === l}>
              {l}
            </button>
          ))}
        </div>

        {/* Bell — dynamic unread count */}
        <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-bg-hover transition-all" aria-label={`Notifications — ${unreadCount} unread`}>
          <span className="text-xl">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Avatar — from real user data */}
        <Link href="/profile"
          className="w-9 h-9 rounded-full bg-accent-orange flex items-center justify-center text-sm font-bold text-white hover:ring-2 hover:ring-accent-orange/50 transition-all"
          aria-label={`Profile — ${user?.name || "User"}`}>
          {initials}
        </Link>
      </div>
    </header>
  );
}
