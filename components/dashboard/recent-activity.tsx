import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History } from "lucide-react"

export function RecentActivity() {
  const activities = [
    { description: "Menambahkan 1x Apel", time: "2 menit yang lalu" },
    { description: "Menggunakan 1x Telur", time: "1 jam yang lalu" },
    { description: "Memperbarui 2x Susu", time: "3 jam yang lalu" },
    { description: "Menghapus 1x Roti", time: "Kemarin" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Aktivitas Terbaru</CardTitle>
        <History className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span>{activity.description}</span>
              <span className="text-muted-foreground">{activity.time}</span>
            </li>
          ))}
        </ul>
        {activities.length === 0 && <p className="text-sm text-muted-foreground">Tidak ada aktivitas terbaru.</p>}
      </CardContent>
    </Card>
  )
}
