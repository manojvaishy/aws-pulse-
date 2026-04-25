"use client";
import { useState } from "react";
import Link from "next/link";
import { UPDATES, Priority } from "@/lib/data";
import { PriorityBadge } from "@/components/ui/Badge";

const TIMELINE_DATA = [
  {
    date: "April 1, 2026",
    items: [
      { time: "10:00 AM", id: "ecs-fargate-deprecation", title: "ECS Runtime Deprecation", role: "DevOps", priority: "critical" as Priority },
      { time: "02:00 PM", id: "lambda-streaming-ga", title: "Lambda Streaming GA", role: "Developer", priority: "high" as Priority },
    ],
  },
  {
    date: "March 31, 2026",
    items: [
      { time: "09:00 AM", id: "codecommit-frozen", title: "CodeCommit Deprecation", role: "All Roles", priority: "critical" as Priority },
      { time: "03:00 PM", id: "data-transfer-cost-reduction", title: "S3 Lifecycle Policy Update", role: "Data Engineer", priority: "normal" as Priority },
    ],
  },
  {
    date: "March 30, 2026",
    items: [
      { time: "11:00 AM", id: "eks-129-ga", title: "EKS 1.29 Release", role: "DevOps", priority: "high" as Priority },
      { time: "04:00 PM", id: "redshift-serverless-price-cut", title: "RDS Aurora MySQL 8.0", role: "Data Engineer", priority: "normal" as Priority },
    ],
  },
  {
    date: "March 29, 2026",
    items: [
      { time: "08:00 AM", id: "java-sdk-v1-eol", title: "Java SDK v1 End of Support", role: "Developer", priority: "critical" as Priority },
      { time: "01:00 PM", id: "cloudwatch-logs-insights", title: "CloudWatch Logs Insights Update", role: "DevOps", priority: "normal" as Priority },
    ],
  },
];

const dotColors = { critical: "bg-red-500 ring-red-500/30", high: "bg-orange-500 ring-orange-500/30", normal: "bg-gray-500 ring-gray-500/30" };

export default function TimelinePage() {
  const [filter, setFilter] = useState<"all" | Priority>("all");

  const filtered = TIMELINE_DATA.map((day) => ({
    ...day,
    items: day.items.filter((i) => filter === "all" || i.priority === filter),
  })).filter((day) => day.items.length > 0);

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-text-primary">Timeline</h1>
        <div className="flex items-center gap-2 bg-bg-card border border-border rounded-lg p-1">
          <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors" aria-label="Previous week">←</button>
          <span className="text-sm font-semibold text-text-primary px-2">March 30 – April 1, 2026</span>
          <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors" aria-label="Next week">→</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {(["all", "critical", "high", "normal"] as const).map((f) => {
          const labels = { all: "All", critical: "🔴 Critical", high: "🟠 High", normal: "⚪ Normal" };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filter === f ? "bg-accent-orange/10 border-accent-orange text-accent-orange" : "border-border text-text-secondary hover:border-text-secondary"}`}
              aria-pressed={filter === f}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {filtered.map((day) => (
          <div key={day.date}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider px-3 py-1 bg-bg-card border border-border rounded-full">
                {day.date}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3 pl-4">
              {day.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 w-20">
                    <span className="text-xs text-text-secondary font-medium">{item.time}</span>
                    <div className={`w-3 h-3 rounded-full ring-4 ${dotColors[item.priority]} ${item.priority === "critical" ? "pulse-dot" : ""}`} aria-hidden="true" />
                  </div>
                  <Link
                    href={`/updates/${item.id}`}
                    className="flex-1 bg-bg-card border border-border rounded-xl p-4 hover:bg-bg-hover hover:border-accent-orange/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <PriorityBadge priority={item.priority} />
                      <span className="text-xs text-text-secondary">{item.role}</span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
