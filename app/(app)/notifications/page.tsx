"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  initNotifications,
  markRead,
  markAllRead,
  dismissNotif,
  getUnreadCount,
  type Notification,
} from "@/lib/notificationStore";
import { getUser } from "@/lib/userStore";
import { PriorityBadge, Tag } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const TYPE_CONFIG = {
  critical: {
    icon: "🔴",
    label: "Critical Alert",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    dot: "bg-red-500",
  },
  important: {
    icon: "🟠",
    label: "Important Update",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    dot: "bg-orange-500",
  },
  info: {
    icon: "⚪",
    label: "Info",
    bg: "bg-gray-500/10",
    border: "border-gray-500/30",
    text: "text-gray-400",
    dot: "bg-gray-500",
  },
};

function NotificationCard({ notif, onMarkRead, onDismiss }: {
  notif: Notification;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const config = TYPE_CONFIG[notif.type];
  const router = useRouter();

  return (
    <div
      className={`relative rounded-xl border p-5 transition-all ${
        notif.isRead
          ? "bg-bg-card/50 border-border/50 opacity-70"
          : `${config.bg} ${config.border}`
      }`}
    >
      {/* Unread dot */}
      {!notif.isRead && (
        <span
          className={`absolute top-5 left-5 w-2.5 h-2.5 rounded-full ${config.dot} ${
            notif.type === "critical" ? "pulse-dot" : ""
          }`}
          aria-label="Unread"
        />
      )}

      <div className="pl-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
              {config.icon} {config.label}
            </span>
            <PriorityBadge priority={notif.priority as "critical" | "high" | "normal"} />
            {notif.services.slice(0, 2).map((s) => (
              <Tag key={s} label={s} />
            ))}
          </div>
          <span className="text-xs text-text-secondary whitespace-nowrap">{notif.timeAgo}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text-primary leading-snug mb-2">
          {notif.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
          {notif.summary}
        </p>

        {/* Action required */}
        {notif.actionRequired && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 mb-3">
            <span className="text-red-400 text-sm flex-shrink-0">⚠️</span>
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-0.5">
                Action Required
              </p>
              <p className="text-xs text-text-primary">{notif.actionRequired}</p>
              {notif.deadline && (
                <p className="text-xs text-red-400 mt-1 font-semibold">
                  Deadline: {notif.deadline}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {!notif.isRead && (
            <button
              onClick={() => onMarkRead(notif.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary hover:bg-bg-hover border border-border text-xs font-medium text-text-secondary hover:text-text-primary transition-all"
            >
              ✓ Mark Read
            </button>
          )}
          <Link
            href={`/updates/${notif.updateId}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-orange/10 hover:bg-accent-orange/20 border border-accent-orange/30 text-xs font-medium text-accent-orange transition-all"
          >
            → View Details
          </Link>
          <button
            onClick={() => onDismiss(notif.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30 text-xs font-medium text-text-secondary hover:text-red-400 transition-all ml-auto"
          >
            ✕ Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | NotifType>("all");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    const role = user?.role || localStorage.getItem("aws_pulse_role") || "DevOps";
    const notifications = initNotifications(role);
    setNotifs(notifications);
    setLoading(false);
  }, []);

  const handleMarkRead = (id: string) => {
    const updated = markRead(id);
    setNotifs(updated);
    showToast("✓ Marked as read", "success");
  };

  const handleMarkAllRead = () => {
    const updated = markAllRead();
    setNotifs(updated);
    showToast("✓ All notifications marked as read", "success");
  };

  const handleDismiss = (id: string) => {
    const updated = dismissNotif(id);
    setNotifs(updated);
    showToast("Notification dismissed", "info", "🔕");
  };

  const filtered = notifs.filter((n) => {
    if (n.isDismissed) return false;
    if (filter === "all") return true;
    return n.type === filter;
  });

  const unreadCount = getUnreadCount(notifs);
  const criticalCount = notifs.filter((n) => n.type === "critical" && !n.isRead && !n.isDismissed).length;

  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          <p className="text-sm text-text-secondary mt-1">
            {unreadCount > 0 ? (
              <>
                You have <span className="text-accent-orange font-semibold">{unreadCount} unread</span> notification{unreadCount !== 1 ? "s" : ""}
                {criticalCount > 0 && (
                  <span className="text-red-400 font-semibold"> · {criticalCount} critical</span>
                )}
              </>
            ) : (
              "You're all caught up!"
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 border border-accent-orange text-accent-orange rounded-lg text-sm font-semibold hover:bg-accent-orange/10 transition-all"
          >
            ✓ Mark All Read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(["all", "critical", "important", "info"] as const).map((f) => {
          const labels = {
            all: "All",
            critical: "🔴 Critical",
            important: "🟠 Important",
            info: "⚪ Info",
          };
          const count = f === "all"
            ? notifs.filter((n) => !n.isDismissed).length
            : notifs.filter((n) => n.type === f && !n.isDismissed).length;

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filter === f
                  ? "bg-accent-orange/10 border-accent-orange text-accent-orange"
                  : "border-border text-text-secondary hover:border-text-secondary hover:text-text-primary"
              }`}
              aria-pressed={filter === f}
            >
              {labels[f]} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Notifications list */}
      {loading ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-bg-card border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 w-3/4 bg-bg-hover rounded mb-2" />
              <div className="h-3 w-full bg-bg-hover rounded mb-1" />
              <div className="h-3 w-2/3 bg-bg-hover rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-bg-card rounded-xl border border-border">
          <span className="text-4xl mb-4 block">
            {filter === "all" ? "🎉" : "📭"}
          </span>
          <p className="text-text-primary font-semibold mb-1">
            {filter === "all" ? "All caught up!" : "No notifications"}
          </p>
          <p className="text-text-secondary text-sm mb-4">
            {filter === "all"
              ? "You've read or dismissed all notifications"
              : `No ${filter} notifications to show`}
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="px-4 py-2 bg-accent-orange text-white rounded-lg text-sm font-semibold"
            >
              View All Notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notif) => (
            <NotificationCard
              key={notif.id}
              notif={notif}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
}
