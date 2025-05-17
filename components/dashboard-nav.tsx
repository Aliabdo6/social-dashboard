"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Home, PenSquare, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: isActive("/"),
    },
    {
      title: "Followers",
      href: "/followers",
      icon: Users,
      isActive: isActive("/followers"),
    },
    {
      title: "Feed",
      href: "/feed",
      icon: Home,
      isActive: isActive("/feed"),
    },
    {
      title: "Posts",
      href: "/posts",
      icon: PenSquare,
      isActive: isActive("/posts"),
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      isActive: isActive("/settings"),
    },
  ]

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span>Social Dashboard</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  item.isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                    item.isActive ? "bg-primary text-primary-foreground" : "border border-border"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
