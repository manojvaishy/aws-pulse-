"use client";
import { useState } from "react";
import Link from "next/link";
import { USER, READING_HISTORY, BOOKMARKS } from "@/lib/data";
import { PriorityBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

function Toggle({ on, locked, onChange, label }: { on: boolean; locked?: boolean; onChange?: () => void; label: string }) {
  return (
    <button onClick={locked ? undefined : onChange} disabled={locked} role="switch" aria-checked={on} aria-label={label}
      className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${on ? "bg-accent-orange" : "bg-bg-secondary border border-border"} ${locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function ProfilePage() {
  const { showToast } = useToast();
  const [lang, setLang] = useState<"en" | "hi" | "hg">("en");
  const [showDelete, setShowDelete] = useState(false);
  const [notifs, setNotifs] = useState({ high: true, normal: false, popup: true, email: false });
  const SERVICES = ["ECS", "EKS", "CodePipeline", "CloudWatch", "CloudFormation", "Systems Manager", "ECR", "CodeDeploy"];

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto space-y-6">

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDelete(false)} />
          <div className="relative w-full max-w-sm bg-bg-card border border-red-500/40 rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-bold text-text-primary mb-2">Delete Account?</h2>
            <p className="text-sm text-text-secondary mb-6">This will permanently delete your account. Cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="flex-1 py-2.5 rounded-lg border border-border text-text-secondary text-sm">Cancel</button>
              <button className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold">Delete Account</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-orange/60 via-orange-400/30 to-transparent" />
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-accent-orange flex items-center justify-center text-3xl font-black text-white shadow-lg">{USER.initials}</div>
            <button className="text-xs text-text-secondary">Change Photo</button>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-text-primary mb-1">{USER.name}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-secondary border border-border rounded-full text-sm text-text-secondary mb-3">⚙️ {USER.designation}</span>
            <div className="space-y-1.5 text-sm text-text-secondary">
              <p>🏢 {USER.company}</p>
              <p>📍 {USER.location}</p>
              <p>📅 Member since {USER.joinedMonth}</p>
              <p className="text-xs opacity-60">Last active: {USER.lastActive}</p>
            </div>
          </div>
          <button onClick={() => showToast("✓ Profile updated", "success")} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-accent-orange text-accent-orange rounded-lg text-sm font-semibold hover:bg-accent-orange/10 transition-all">
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Your AWS Pulse Activity</h2></div>
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { value: USER.stats.updatesRead.toLocaleString(), label: "Updates Read", sub: "Since joining", icon: "📖", color: "text-blue-400" },
            { value: USER.stats.criticalCaught.toString(), label: "Critical Caught", sub: "Saved 23 incidents", icon: "🔴", color: "text-red-400" },
            { value: USER.stats.searchesPerformed.toString(), label: "Searches", sub: "Avg 5 per day", icon: "🔍", color: "text-accent-orange" },
            { value: `${USER.stats.feedRelevance}%`, label: "Feed Relevance", sub: "Based on reads", icon: "✅", color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="bg-bg-secondary border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl font-black text-text-primary">{s.value}</span>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide leading-tight mb-1">{s.label}</p>
              <p className={`text-xs font-medium ${s.color}`}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account info */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Account Information</h2></div>
        <div className="p-6">
          {[
            { label: "Full Name", value: USER.name, action: "Edit" },
            { label: "Email Address", value: USER.email, action: "Change", verified: true },
            { label: "Company", value: USER.company, action: "Edit" },
            { label: "Designation", value: USER.designation, action: "Edit" },
            { label: "Location", value: USER.location, action: "Edit" },
            { label: "Member Since", value: USER.joinedDate },
            { label: "Last Active", value: USER.lastActive },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 border-b border-border/50 last:border-0">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5">{row.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text-primary">{row.value}</p>
                  {row.verified && <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">✓ Verified</span>}
                </div>
              </div>
              {row.action && <button className="text-xs text-accent-orange hover:underline font-semibold">{row.action}</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Role & Language */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Your Preferences</h2></div>
        <div className="p-6 space-y-5">
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">⚙️</span><p className="text-base font-bold text-text-primary">DevOps Engineer</p></div>
                <p className="text-sm text-text-secondary">CI/CD, ECS, EKS, CloudFormation, CloudWatch, Systems Manager</p>
              </div>
              <button className="text-xs text-text-secondary border border-border px-3 py-1.5 rounded-lg">Change Role →</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SERVICES.map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-bg-card border border-border text-text-secondary">{s}</span>)}
            </div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <p className="text-sm font-semibold text-text-primary mb-1">Preferred Language</p>
            <p className="text-xs text-text-secondary mb-4">Powered by AWS Bedrock</p>
            <div className="flex gap-2 flex-wrap">
              {[{ id: "en" as const, flag: "🇬🇧", label: "English" }, { id: "hi" as const, flag: "🇮🇳", label: "Hindi" }, { id: "hg" as const, flag: "🇮��", label: "Hinglish" }].map((l) => (
                <button key={l.id} onClick={() => { setLang(l.id); showToast(`🌐 Switched to ${l.label}`, "info"); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${lang === l.id ? "bg-accent-orange border-accent-orange text-white" : "border-border text-text-secondary"}`}>
                  {l.flag} {l.label} {lang === l.id && "✓"}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <p className="text-sm font-semibold text-text-primary mb-4">Notification Preferences</p>
            <div className="space-y-4">
              {[
                { key: "critical", icon: "🔴", label: "Critical Alerts", desc: "Deprecations, breaking changes", locked: true, on: true },
                { key: "high", icon: "🟠", label: "High Priority", desc: "Important but not breaking", on: notifs.high },
                { key: "normal", icon: "⚪", label: "Normal Updates", desc: "General announcements", on: notifs.normal },
                { key: "popup", icon: "🔔", label: "Login Popup", desc: "Show critical alerts on login", on: notifs.popup },
                { key: "email", icon: "📧", label: "Email Digest", desc: "Daily summary", on: notifs.email, soon: true },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-base mt-0.5">{n.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text-primary">{n.label}</p>
                        {n.locked && <span className="text-xs text-text-secondary">🔒</span>}
                        {n.soon && <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">Coming soon</span>}
                      </div>
                      <p className="text-xs text-text-secondary">{n.desc}</p>
                    </div>
                  </div>
                  <Toggle on={n.on} locked={n.locked} label={n.label}
                    onChange={() => setNotifs((p) => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reading history */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Recently Read Updates</h2></div>
        <div className="p-6">
          <div className="space-y-3">
            {READING_HISTORY.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-secondary transition-all">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary">{item.date} · {item.time}</span>
                    <PriorityBadge priority={item.priority} />
                  </div>
                </div>
                <Link href={`/updates/${item.id}`} className="text-xs text-accent-orange hover:underline font-semibold flex-shrink-0">View →</Link>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="text-sm text-accent-orange hover:underline font-semibold">View All Reading History →</button>
          </div>
        </div>
      </div>

      {/* Bookmarks */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Bookmarked Updates</h2></div>
        <div className="p-6">
          <div className="space-y-3">
            {BOOKMARKS.map((b) => (
              <div key={b.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-bg-secondary transition-all">
                <span className="text-lg flex-shrink-0 mt-0.5">��</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{b.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary">Saved {b.savedDate}</span>
                    <PriorityBadge priority={b.priority} />
                  </div>
                  <p className="text-xs text-text-secondary mt-1 italic">{b.note}</p>
                </div>
                <Link href={`/updates/${b.id}`} className="text-xs text-accent-orange hover:underline font-semibold flex-shrink-0">View →</Link>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="text-sm text-accent-orange hover:underline font-semibold">View All Bookmarks →</button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Security</h2></div>
        <div className="p-6">
          {[
            { label: "Password", value: "Last changed: 45 days ago", action: "Change Password →", style: "text-accent-orange" },
            { label: "Two-Factor Authentication", badge: <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">Not enabled</span>, action: "Enable 2FA →", style: "text-accent-orange" },
            { label: "Active Sessions", sessions: ["Pune, India · Chrome", "Mumbai, India · Mobile"], action: "Manage Sessions →", style: "text-text-secondary" },
            { label: "Login History", value: "Last login: April 1, 2026 · 2:34 PM · Pune, India", action: "View All →", style: "text-text-secondary" },
          ].map((row, i) => (
            <div key={i} className="flex items-start justify-between py-4 border-b border-border/50 last:border-0 gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary mb-1">{row.label}</p>
                {row.value && <p className="text-xs text-text-secondary">{row.value}</p>}
                {row.badge && <div className="mt-1">{row.badge}</div>}
                {row.sessions && (
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-text-secondary">2 active sessions</p>
                    {row.sessions.map((s) => <p key={s} className="text-xs text-text-secondary/70">· {s}</p>)}
                  </div>
                )}
              </div>
              <button className={`flex-shrink-0 text-xs font-semibold ${row.style}`}>{row.action}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-bg-card border border-red-500/20 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-red-500/20"><h2 className="text-xs font-bold text-red-400 uppercase tracking-wider">Account Actions</h2></div>
        <div className="p-6 space-y-3">
          <button onClick={() => showToast("📥 Preparing your data export...", "info")}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border hover:bg-bg-hover transition-all text-left">
            <span className="text-lg">📥</span>
            <div><p className="text-sm font-semibold text-text-primary">Export My Data</p><p className="text-xs text-text-secondary">Download all your data as JSON</p></div>
          </button>
          <button onClick={() => setShowDelete(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-all text-left">
            <span className="text-lg">🗑️</span>
            <div><p className="text-sm font-semibold text-red-400">Delete Account</p><p className="text-xs text-text-secondary">Permanently delete your account and all data</p></div>
          </button>
        </div>
      </div>

    </div>
  );
}
