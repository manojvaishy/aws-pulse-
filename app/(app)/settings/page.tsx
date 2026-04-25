"use client";
import { useState } from "react";
import { USER } from "@/lib/data";
import { useToast } from "@/components/ui/Toast";

function Toggle({ on, locked, onChange, label }: { on: boolean; locked?: boolean; onChange?: () => void; label: string }) {
  return (
    <button
      onClick={locked ? undefined : onChange}
      disabled={locked}
      className={`relative w-11 h-6 rounded-full transition-all ${on ? "bg-accent-orange" : "bg-bg-secondary border border-border"} ${locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { showToast } = useToast();
  const [lang, setLang] = useState<"EN" | "HI" | "HG">("EN");
  const [notifs, setNotifs] = useState({ high: true, normal: false, popup: true, email: false });
  const [defaultFeed, setDefaultFeed] = useState<"my" | "all">("my");
  const [cardsPerPage, setCardsPerPage] = useState(10);

  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">Profile</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-accent-orange flex items-center justify-center text-xl font-bold text-white">
              {USER.initials}
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">{USER.name}</p>
              <p className="text-sm text-text-secondary">{USER.email}</p>
              <p className="text-sm text-text-secondary">{USER.company}</p>
            </div>
          </div>
          <button
            onClick={() => showToast("✓ Profile updated", "success")}
            className="px-4 py-2 border border-accent-orange text-accent-orange rounded-lg text-sm font-semibold hover:bg-accent-orange/10 transition-all"
          >
            ✏️ Edit Profile
          </button>
        </section>

        {/* Role */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">Role</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-text-primary">⚙️ {USER.role} Engineer</p>
              <p className="text-sm text-text-secondary mt-1">Updates filtered for CI/CD, ECS, EKS, CloudWatch</p>
            </div>
            <button className="text-sm text-accent-orange hover:underline font-medium">Change Role →</button>
          </div>
        </section>

        {/* Language */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Language</h2>
          <p className="text-sm text-text-secondary mb-4">Preferred language for simplified summaries</p>
          <div className="flex items-center bg-bg-secondary border border-border rounded-lg p-1 gap-0.5 w-fit" role="group" aria-label="Language preference">
            {(["EN", "HI", "HG"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); showToast(`🌐 Switched to ${l}`, "info"); }}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${lang === l ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"}`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">Notifications</h2>
          <div className="space-y-4">
            {[
              { key: "critical", icon: "🔴", label: "Critical Alerts", desc: "Deprecations, breaking changes", locked: true, on: true },
              { key: "high", icon: "🟠", label: "High Priority Updates", desc: "Important but not breaking", locked: false, on: notifs.high },
              { key: "normal", icon: "⚪", label: "Normal Updates", desc: "General announcements", locked: false, on: notifs.normal },
              { key: "popup", icon: "🔔", label: "Login Popup", desc: "Show critical alerts on login", locked: false, on: notifs.popup },
              { key: "email", icon: "📧", label: "Email Digest", desc: "Daily summary to your email", locked: false, on: notifs.email, soon: true },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-1">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{n.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-primary">{n.label}</p>
                      {n.locked && <span className="text-xs text-text-secondary">🔒</span>}
                      {n.soon && <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">Coming soon</span>}
                    </div>
                    <p className="text-xs text-text-secondary">{n.desc}</p>
                  </div>
                </div>
                <Toggle
                  on={n.on}
                  locked={n.locked}
                  label={n.label}
                  onChange={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Display */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">Display</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text-primary">Theme</p>
                <p className="text-xs text-text-secondary">Dark mode (default)</p>
              </div>
              <span className="text-xs bg-bg-secondary border border-border px-3 py-1.5 rounded-lg text-text-secondary">🌙 Dark</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">Default Feed</p>
              <div className="flex items-center bg-bg-secondary border border-border rounded-lg p-0.5 gap-0.5">
                {(["my", "all"] as const).map((f) => (
                  <button key={f} onClick={() => setDefaultFeed(f)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${defaultFeed === f ? "bg-accent-orange text-white" : "text-text-secondary"}`}
                    aria-pressed={defaultFeed === f}>
                    {f === "my" ? "My Feed" : "All Updates"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">Cards per page</p>
              <div className="flex items-center bg-bg-secondary border border-border rounded-lg p-0.5 gap-0.5">
                {[10, 20, 50].map((n) => (
                  <button key={n} onClick={() => setCardsPerPage(n)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${cardsPerPage === n ? "bg-accent-orange text-white" : "text-text-secondary"}`}
                    aria-pressed={cardsPerPage === n}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="bg-bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">Account</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-bg-hover transition-all text-sm font-medium text-text-primary">
              🔑 Change Password
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-bg-hover transition-all text-sm font-medium text-text-primary">
              📥 Export My Data
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-all text-sm font-medium text-red-400">
              🗑️ Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
