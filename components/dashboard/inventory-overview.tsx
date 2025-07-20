import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, AlertCircle } from "lucide-react"

export function InventoryOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ikhtisar Inventaris</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">245 Item</div>
        <p className="text-xs text-muted-foreground">+20 item baru bulan ini</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span>Kategori: 15</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span>Stok Rendah: 5</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
