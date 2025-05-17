import { SettingsContent } from "@/components/settings-content"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <ThemeToggle />
          </div>
          <SettingsContent />
        </main>
      </div>
    </div>
  )
}
