import { DashboardHeader }  from "@/components/dashboard/business/dashboard-header"
import { DashboardStats } from "@/components/dashboard/business/dashboard-stats"
import { InventoryOverview } from "@/components/dashboard/business/inventory-overview"
import { QuickActions } from "@/components/dashboard/business/quick-actions"
import { ExpirationAlerts } from "@/components/dashboard/business/expiration-alerts"
import { RecentActivity } from "@/components/dashboard/business/recent-activity"
import { WeatherWidget } from "@/components/dashboard/business/weather-widget"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang, John! 👋</h1>
              <p className="text-green-100">Hari ini Anda memiliki 3 item yang perlu perhatian</p>
            </div>
            <WeatherWidget />
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <InventoryOverview />
            <ExpirationAlerts />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
