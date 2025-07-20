import { InventoryTable } from "@/components/inventory-table"
import { InventoryStats } from "@/components/inventory-stats"
import { DashboardHeader }  from "@/components/dashboard/personal/dashboard-header"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manajemen Inventaris</h1>
        </div>

        <InventoryStats />
        <InventoryTable />
      </main>
    </div>
  )
}
