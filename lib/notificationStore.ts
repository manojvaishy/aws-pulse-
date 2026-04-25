// ── Smart Alert & Notification Engine (SANE) ─────────────────────────────────
import { UPDATES, type Update, type Role, ROLE_SERVICES } from "./data";

export type NotifType = "critical" | "important" | "info";

export interface Notification {
  id: string;
  updateId: string;
  title: string;
  summary: string;
  type: NotifType;       // critical | important | info
  priority: string;
  category: string;
  services: string[];
  date: string;
  timeAgo: string;
  isRead: boolean;
  isDismissed: boolean;
  actionRequired?: string;
  deadline?: string;
  sourceUrl: string;
}

// ── Generate notifications from updates based on user role ────────────────────
export function generateNotifications(userRole: string): Notification[] {
  const userServices = ROLE_SERVICES[userRole] || [];

  return UPDATES
    .filter((u) => {
      // Only notify for relevant updates
      if (u.roles.includes("All Roles")) return true;
      if (u.roles.includes(userRole as Role)) return true;
      return u.services.some((s) => userServices.includes(s));
    })
    .map((u): Notification => ({
      id: `notif-${u.id}`,
      updateId: u.id,
      title: u.title,
      summary: u.summary,
      type: getNotifType(u),
      priority: u.priority,
      category: u.category,
      services: u.services,
      date: u.date,
      timeAgo: u.timeAgo,
      isRead: false,
      isDismissed: false,
      actionRequired: u.actionRequired,
      deadline: u.deadline,
      sourceUrl: u.sourceUrl,
    }))
    .sort((a, b) => {
      // Critical first, then important, then info
      const order = { critical: 0, important: 1, info: 2 };
      return order[a.type] - order[b.type];
    });
}

function getNotifType(u: Update): NotifType {
  if (u.priority === "critical") return "critical";
  if (u.priority === "high") return "important";
  return "info";
}

// ── localStorage persistence ──────────────────────────────────────────────────
const KEY = "aws_pulse_notifications";

export function getStoredNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveNotifications(notifs: Notification[]) {
  localStorage.setItem(KEY, JSON.stringify(notifs));
}

export function initNotifications(userRole: string): Notification[] {
  const stored = getStoredNotifications();
  if (stored.length > 0) return stored;
  // First time — generate from updates
  const fresh = generateNotifications(userRole);
  saveNotifications(fresh);
  return fresh;
}

export function markRead(id: string) {
  const notifs = getStoredNotifications().map((n) =>
    n.id === id ? { ...n, isRead: true } : n
  );
  saveNotifications(notifs);
  return notifs;
}

export function markAllRead() {
  const notifs = getStoredNotifications().map((n) => ({ ...n, isRead: true }));
  saveNotifications(notifs);
  return notifs;
}

export function dismissNotif(id: string) {
  const notifs = getStoredNotifications().map((n) =>
    n.id === id ? { ...n, isDismissed: true, isRead: true } : n
  );
  saveNotifications(notifs);
  return notifs;
}

export function getUnreadCount(notifs: Notification[]): number {
  return notifs.filter((n) => !n.isRead && !n.isDismissed).length;
}

export function getCriticalUnread(notifs: Notification[]): Notification[] {
  return notifs.filter((n) => n.type === "critical" && !n.isDismissed);
}
