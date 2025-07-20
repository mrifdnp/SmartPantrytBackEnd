import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, List, Scan, Utensils } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tindakan Cepat</CardTitle>
        <Plus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="flex flex-col h-auto py-4 bg-transparent">
          <Plus className="h-5 w-5 mb-1" />
          <span>Tambah Item</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-4 bg-transparent">
          <List className="h-5 w-5 mb-1" />
          <span>Daftar Belanja</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-4 bg-transparent">
          <Scan className="h-5 w-5 mb-1" />
          <span>Pindai Item</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-4 bg-transparent">
          <Utensils className="h-5 w-5 mb-1" />
          <span>Saran Resep</span>
        </Button>
      </CardContent>
    </Card>
  )
}
