import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 pt-14 p-6 w-full bg-gray-100 min-h-screen">
                {children}
            </main>
        </div>
    );
}