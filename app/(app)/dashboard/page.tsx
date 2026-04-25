"use client";
import { useState, useEffect } from "react";
import { UPDATES, Update, ROLE_SERVICES } from "@/lib/data";
import { getUser } from "@/lib/userStore";
import CriticalAlertPopup from "@/components/dashboard/CriticalAlertPopup";
import UpdateCard from "@/components/dashboard/UpdateCard";
import TrendingCard from "@/components/dashboard/TrendingCard";
import { SkeletonCard, SkeletonStat } from "@/components/ui/Skeleton";

const TRENDING = [
  { id: "codecommit-frozen",           title: "AWS CodeCommit Deprecation",       views: "2.4k views", role: "DevOps",    priority: "critical" as const, trend: "340%" },
  { id: "bedrock-claude-3-available",  title: "Claude 3 on Amazon Bedrock",       views: "3.2k views", role: "ML Eng",    priority: "critical" as const, trend: "520%" },
  { id: "lambda-streaming-ga",         title: "Lambda Response Streaming GA",     views: "1.8k views", role: "Developer", priority: "high"     as const, trend: "120%" },
  { id: "guardduty-malware-protection",title: "GuardDuty Malware Protection S3",  views: "1.9k views", role: "Security",  priority: "critical" as const, trend: "290%" },
  { id: "java-sdk-v1-eol",             title: "Java SDK v1 End of Support",       views: "876 views",  role: "Developer", priority: "critical" as const, trend: "95%"  },
];

type FilterType = "all" | "critical" | "high" | "normal";
type FeedType = "my" | "all";

function matchesRole(update: Update, userRole: string): boolean {
  if (!userRole) return true;
  if (update.roles.includes("All Roles")) return true;
  if (update.roles.includes(userRole as never)) return true;
  const userServices = ROLE_SERVICES[userRole] || [];
  return update.services.some((s) => userServices.includes(s));
}

function rssToUpdate(item: Record<string, string>, role: string): Update {
  return {
    id: `rss-${item.id || Math.random().toString(36).slice(2)}`,
    title: item.title,
    date: item.date || "Recent",
    timeAgo: item.timeAgo || "Recently",
    priority: (item.priority as "critical" | "high" | "normal") || "normal",
    roles: [role as never, "All Roles"],
    services: [],
    category: item.category || "AWS Update",
    summary: item.summary || item.title,
    summaryHi: item.summary || item.title,
    summaryHg: item.summary || item.title,
    originalContent: item.summary || "",
    isRead: false,
    isBookmarked: false,
    views: Math.floor(Math.random() * 500) + 100,
    sourceUrl: item.link || "https://aws.amazon.com/new/",
  };
}

const ROLE_ICONS: Record<string, string> = {
  DevOps: "⚙️", Developer: "💻", Architect: "🏗️", "Data Engineer": "📊",
  SRE: "🔧", "ML Engineer": "🤖", "Security Engineer": "🛡️", FinOps: "💰",
};

export default function DashboardPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>(UPDATES);
  const [feed, setFeed] = useState<FeedType>("my");
  const [filter, setFilter] = useState<FilterType>("all");
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState("there");
  const [rssCount, setRssCount] = useState(0);

  useEffect(() => {
    const user = getUser();
    const savedRole = user?.role || localStorage.getItem("aws_pulse_role") || "DevOps";
    setUserRole(savedRole);
    if (user?.name) setUserName(user.name.split(" ")[0]);

    const fetchRSS = async () => {
      try {
        const res = await fetch(`/api/aws-updates?role=${encodeURIComponent(savedRole)}`);
        const data = await res.json();
        if (data.updates?.length > 0) {
          const rssUpdates = data.updates.map((item: Record<string, string>) => rssToUpdate(item, savedRole));
          setUpdates([...rssUpdates, ...UPDATES]);
          setRssCount(data.updates.length);
        }
      } catch { /* use static data */ }
    };

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowAlert(true), 400);
      fetchRSS();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleRead = (id: string) => {
    setUpdates((prev) => prev.map((u) => u.id === id ? { ...u, isRead: !u.isRead } : u));
  };

  const filtered = updates.filter((u) => {
    if (feed === "my" && !matchesRole(u, userRole)) return false;
    if (filter !== "all" && u.priority !== filter) return false;
    return true;
  });

  const myFeedCount = updates.filter((u) => matchesRole(u, userRole)).length;
  const criticalCount = updates.filter((u) => matchesRole(u, userRole) && u.priority === "critical" && !u.isRead).length;
  const unreadCount = updates.filter((u) => matchesRole(u, userRole) && !u.isRead).length;

  const STATS = [
    { value: String(updates.length), label: "Total Updates", sub: rssCount > 0 ? `${rssCount} live from AWS` : "Static data", icon: "📊", color: "text-blue-400", border: "" },
    { value: String(unreadCount),    label: "Unread for You", sub: `${criticalCount} critical`, icon: "🔔", color: "text-accent-orange", border: "" },
    { value: String(criticalCount),  label: "Critical Alerts", sub: "Action required", icon: "🔴", color: "text-red-400", border: criticalCount > 0 ? "border-red-500/30 animate-pulse" : "" },
    { value: String(myFeedCount),    label: "In Your Feed", sub: `Matched for ${userRole}`, icon: "✅", color: "text-green-400", border: "" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto">
      {showAlert && <CriticalAlertPopup onClose={() => setShowAlert(false)} />}

      {/* Header */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">
            {greeting}, <span className="text-text-primary font-medium">{userName}</span>. Showing updates for{" "}
            <span className="text-accent-orange font-semibold">{ROLE_ICONS[userRole]} {userRole}</span>
          </p>
        </div>
        {userRole && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20">
            <span className="text-sm">{ROLE_ICONS[userRole]}</span>
            <span className="text-xs font-semibold text-accent-orange">{userRole}</span>
            <button
              onClick={() => { localStorage.removeItem("aws_pulse_role"); window.location.href = "/onboarding"; }}
              className="text-xs text-text-secondary hover:text-accent-orange transition-colors ml-1"
              title="Change role"
            >✎</button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {loading
          ? Array(4).fill(0).map((_, i) => <SkeletonStat key={i} />)
          : STATS.map((stat) => (
            <div key={stat.label} className={`bg-bg-card border rounded-xl p-4 ${stat.border || "border-border"}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl font-black text-text-primary">{stat.value}</span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{stat.label}</p>
              <p className={`text-xs mt-1 font-medium ${stat.color}`}>{stat.sub}</p>
            </div>
          ))}
      </div>

      {/* Trending */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">🔥 Trending This Week</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {TRENDING.map((t) => <TrendingCard key={t.id} {...t} />)}
        </div>
      </div>

      {/* Feed */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center bg-bg-card border border-border rounded-lg p-1 gap-0.5">
            {(["my", "all"] as const).map((f) => (
              <button key={f} onClick={() => setFeed(f)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${feed === f ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
                aria-pressed={feed === f}>
                {f === "my" ? `My Feed (${myFeedCount})` : `All Updates (${updates.length})`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "critical", "high", "normal"] as const).map((f) => {
              const labels = { all: "All", critical: "🔴 Critical", high: "🟠 High", normal: "⚪ Normal" };
              return (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filter === f ? "bg-accent-orange/10 border-accent-orange text-accent-orange" : "border-border text-text-secondary hover:border-text-secondary"}`}
                  aria-pressed={filter === f}>
                  {labels[f]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed info */}
        {feed === "my" && !loading && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-card border border-border mb-4">
            <span className="text-sm">{ROLE_ICONS[userRole]}</span>
            <p className="text-xs text-text-secondary">
              <strong className="text-text-primary">{filtered.length} updates</strong> matched for{" "}
              <strong className="text-accent-orange">{userRole}</strong>.
              {rssCount > 0 && <span className="text-green-400 ml-1">✓ {rssCount} live from AWS RSS</span>}
              {" "}Switch to <strong className="text-text-primary">All Updates</strong> or use <strong className="text-text-primary">Search</strong> to see everything.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-3">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div className="text-center py-16 bg-bg-card rounded-xl border border-border">
                  <span className="text-4xl mb-4 block">📭</span>
                  <p className="text-text-primary font-semibold mb-1">No updates found</p>
                  <p className="text-text-secondary text-sm mb-4">Try changing your filter or switching to All Updates</p>
                  <button onClick={() => setFeed("all")} className="px-4 py-2 bg-accent-orange text-white rounded-lg text-sm font-semibold">
                    View All Updates
                  </button>
                </div>
              )
              : filtered.map((update) => (
                <UpdateCard key={update.id} update={update} onToggleRead={handleToggleRead} />
              ))}
        </div>
      </div>
    </div>
  );
}
