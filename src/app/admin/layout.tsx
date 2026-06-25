import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Calendar, Settings, LogOut, BarChart3 } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="min-h-screen flex bg-[#F8F5F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3A3A3A] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#DDBEA9]" />
            <div>
              <span className="font-playfair text-xl tracking-widest">LUMIÈRE</span>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#DDBEA9]/60 -mt-0.5">
                Panel Admin
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin", label: "Dashboard", icon: BarChart3 },
            { href: "/admin/reservations", label: "Reservas", icon: Calendar },
            { href: "/admin/settings", label: "Configuración", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#6B705C] flex items-center justify-center text-sm font-medium">
              {session.user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
            </div>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
