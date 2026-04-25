"use client";
import { useState } from "react";
import { ANALYTICS } from "@/lib/data";
import { PriorityBadge } from "@/components/ui/Badge";

const TOP_UPDATES = [
  { rank: 1, title: "AWS CodeCommit Deprecation", views: 2401, role: "DevOps", priority: "critical" as const },
  { rank: 2, title: "Lambda Response Streaming", views: 1847, role: "Developer", priority: "high" as const },
  { rank: 3, title: "EKS 1.29 GA", views: 1203, role: "DevOps", priority: "high" as const },
  { rank: 4, title: "SDK Java v1 EOL", views: 987, role: "Developer", priority: "critical" as const },
  { rank: 5, title: "Pricing Reduction 43%", views: 876, role: "All Roles", priority: "high" as const },
];

const EVENTS = [
  { icon: "👁️", label: "update_viewed", count: 3241, color: "text-blue-400" },
  { icon: "⏭️", label: "update_skipped", count: 8432, color: "text-gray-400" },
  { icon: "✓", label: "marked_read", count: 1847, color: "text-green-400" },
  { icon: "🔍", label: "search_performed", count: 847, color: "text-orange-400" },
  { icon: "🌐", label: "language_switched", count: 234, color: "text-purple-400" },
  { icon: "🔕", label: "notification_dismissed", count: 156, color: "text-gray-400" },
];

const STATS = [
  { value: "12,847", label: "Total Events Tracked", sub: "↑ 23% from last week", color: "text-blue-400" },
  { value: "3,241", label: "Updates Viewed", sub: "↑ 15%", color: "text-green-400" },
  { value: "847", label: "Searches Performed", sub: "↑ 31%", color: "text-orange-400" },
  { value: "234", label: "Language Switches", sub: "EN→HI most common", color: "text-purple-400" },
];

export default function AdminPage() {
  const [period, setPeriod] = useState<"7" | "30" | "90">("7");

  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">📊 Platform Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">Platform-wide usage metrics and insights</p>
        </div>
        <div className="flex items-center bg-bg-card border border-border rounded-lg p-1 gap-0.5">
          {(["7", "30", "90"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${period === p ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
              aria-pressed={period === p}
            >
              {p} Days
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-bg-card border border-border rounded-xl p-5">
            <p className="text-2xl font-black text-text-primary mb-1">{s.value}</p>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-xs font-medium ${s.color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most viewed table */}
        <div className="lg:col-span-2 bg-bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-text-primary">Most Viewed Updates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Most viewed updates">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">#</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Title</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Views</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody>
                {TOP_UPDATES.map((u) => (
                  <tr key={u.rank} className="border-b border-border/50 hover:bg-bg-hover transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-text-secondary">{u.rank}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-text-primary max-w-[200px] truncate">{u.title}</td>
                    <td className="px-5 py-3.5 text-sm text-text-secondary text-right font-semibold">{u.views.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary">{u.role}</td>
                    <td className="px-5 py-3.5"><PriorityBadge priority={u.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Event breakdown */}
          <div className="bg-bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-bold text-text-primary mb-4">Event Breakdown</h2>
            <div className="space-y-3">
              {EVENTS.map((e) => (
                <div key={e.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{e.icon}</span>
                    <span className="text-xs text-text-secondary font-mono">{e.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${e.color}`}>{e.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role distribution */}
          <div className="bg-bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-bold text-text-primary mb-4">Role Distribution</h2>
            <div className="space-y-3">
              {ANALYTICS.roleDistribution.map((r) => (
                <div key={r.role}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">{r.role}</span>
                    <span className="text-xs font-bold text-text-primary">{r.percent}%</span>
                  </div>
                  <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-orange rounded-full transition-all"
                      style={{ width: `${r.percent}%` }}
                      role="progressbar"
                      aria-valuenow={r.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${r.role}: ${r.percent}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
