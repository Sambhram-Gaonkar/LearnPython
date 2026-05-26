import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper lg:flex">
      <Sidebar />
      <main className="flex-1 px-5 py-6 md:px-8 lg:px-10">{children}</main>
    </div>
  );
}
