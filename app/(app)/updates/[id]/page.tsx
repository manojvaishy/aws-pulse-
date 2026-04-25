"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UPDATES } from "@/lib/data";
import { PriorityBadge, Tag } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const RELATED = [
  { id: "eks-129-ga", title: "ECS Service Connect GA", priority: "high" as const },
  { id: "lambda-streaming-ga", title: "Fargate Spot Update", priority: "normal" as const },
  { id: "cloudwatch-logs-insights", title: "ECS Exec Feature Update", priority: "normal" as const },
];

export default function UpdateDetailPage() {
  const { id } = useParams();
  const update = UPDATES.find((u) => u.id === id) ?? UPDATES[0];
  const [view, setView] = useState<"simplified" | "original">("simplified");
  const [lang, setLang] = useState<"en" | "hi" | "hg">("en");
  const [isRead, setIsRead] = useState(update.isRead);
  const { showToast } = useToast();

  const summaryMap = { en: update.summary, hi: update.summaryHi, hg: update.summaryHg };

  const handleMarkRead = () => {
    setIsRead(!isRead);
    showToast(isRead ? "Marked as unread" : "✓ Marked as read", isRead ? "info" : "success");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("🔗 Link copied to clipboard", "info");
  };

  const handleAskAI = () => {
    window.dispatchEvent(new CustomEvent("ask-ai-about-update", {
      detail: {
        context: {
          title: update.title,
          category: update.category,
          priority: update.priority,
          summary: update.summary,
        },
        question: "Is update ko simple Hinglish mein explain karo — kya hua, kyun matter karta hai, aur mujhe kya karna chahiye?",
      },
    }));
    showToast("💬 AI assistant opening...", "info");
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-text-primary transition-colors">← Back to Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-text-primary transition-colors">Updates</Link>
        <span>/</span>
        <span className="text-text-primary truncate max-w-[200px]">{update.services[0]}</span>
      </nav>

      {/* Hero */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <PriorityBadge priority={update.priority} size="md" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary leading-tight mb-4">{update.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
          <span className="flex items-center gap-1.5">📅 {update.date}</span>
          <span className="flex items-center gap-1.5">
            🏷️ {update.services.join(" | ")} · {update.roles.join(", ")}
          </span>
          <span className="flex items-center gap-1.5">⏱️ {update.timeAgo}</span>
          <span className="flex items-center gap-1.5">👁️ {update.views.toLocaleString()} views</span>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleMarkRead}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent-orange hover:bg-orange-400 text-white rounded-lg text-sm font-semibold transition-all"
            aria-label={isRead ? "Mark as unread" : "Mark as read"}
          >
            {isRead ? "↩ Mark Unread" : "✓ Mark as Read"}
          </button>
          <button
            onClick={handleAskAI}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 border border-purple-500/40 hover:bg-purple-500/20 rounded-lg text-sm font-semibold text-purple-400 hover:text-purple-300 transition-all"
            aria-label="Ask AI to explain this update"
          >
            💬 Ask AI to Explain
          </button>
          <a
            href={update.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border border-border hover:border-text-secondary rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
          >
            ↗ Open on AWS
          </a>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border border-border hover:border-text-secondary rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
          >
            🔗 Copy Link
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 mb-6">
        {/* Toggles */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center bg-bg-secondary border border-border rounded-lg p-1 gap-0.5">
            {(["simplified", "original"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${view === v ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
                aria-pressed={view === v}
              >
                {v === "simplified" ? "📝 Simplified" : "📄 Original"}
              </button>
            ))}
          </div>

          {view === "simplified" && (
            <div className="flex items-center bg-bg-secondary border border-border rounded-lg p-1 gap-0.5" role="group" aria-label="Language">
              {(["en", "hi", "hg"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all ${lang === l ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        {view === "simplified" ? (
          <div className="border-l-4 border-accent-orange bg-orange-500/5 rounded-r-xl p-5">
            <p className="text-xs font-semibold text-accent-orange uppercase tracking-wider mb-4">⚡ AI Simplified Summary</p>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{summaryMap[lang]}</div>
            {update.actionRequired && (
              <div className="mt-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Action Required</p>
                <p className="text-sm text-text-primary">{update.actionRequired}</p>
                {update.deadline && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">Deadline: {update.deadline}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-bg-secondary rounded-xl p-5 border border-border">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Original AWS Announcement</p>
            <p className="text-sm text-text-secondary leading-relaxed font-mono">{update.originalContent}</p>
          </div>
        )}
      </div>

      {/* Related */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Related Updates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED.map((r) => (
            <Link
              key={r.id}
              href={`/updates/${r.id}`}
              className="bg-bg-card border border-border rounded-xl p-4 hover:bg-bg-hover hover:border-accent-orange/30 transition-all"
            >
              <PriorityBadge priority={r.priority} />
              <p className="text-sm font-semibold text-text-primary mt-2 leading-snug">{r.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
