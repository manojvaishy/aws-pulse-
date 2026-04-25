import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ChatWidget from "@/components/chat/ChatWidget";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 pb-20 lg:pb-0 page-enter">
          {children}
        </main>
      </div>
      <MobileNav />
      <ChatWidget />
    </div>
  );
}
