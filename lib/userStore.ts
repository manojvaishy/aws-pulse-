// ── User Store — localStorage based (no backend needed for prototype) ─────────
// In production this would be a real DB + JWT auth

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  designation: string;
  role: string;
  language: string;
  joinedAt: string;
  avatar: string; // initials
}

export function saveUser(user: UserProfile) {
  localStorage.setItem("aws_pulse_user", JSON.stringify(user));
}

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("aws_pulse_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function updateUser(partial: Partial<UserProfile>) {
  const existing = getUser();
  if (!existing) return;
  saveUser({ ...existing, ...partial });
}

export function clearUser() {
  localStorage.removeItem("aws_pulse_user");
  localStorage.removeItem("aws_pulse_role");
  localStorage.removeItem("aws_pulse_language");
}

export function isLoggedIn(): boolean {
  return !!getUser();
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}
