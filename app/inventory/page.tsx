import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InventoryTable } from "@/components/inventory-table"
import { InventoryStats } from "@/components/inventory-stats"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"



export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manajemen Inventaris</h1>
          <Link href="/inventory/tambah">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Button>
          </Link>
        </div>
        <InventoryStats />
        <InventoryTable />
      </main>
    </div>
  )
}
