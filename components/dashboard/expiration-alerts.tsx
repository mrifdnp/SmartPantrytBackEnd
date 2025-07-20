import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarX } from "lucide-react"

export function ExpirationAlerts() {
  const expiringItems = [
    { name: "Susu", daysLeft: 2, status: "Segera Habis" },
    { name: "Telur", daysLeft: 5, status: "Mendekati" },
    { name: "Roti", daysLeft: 1, status: "Segera Habis" },
    { name: "Yogurt", daysLeft: 7, status: "Mendekati" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Peringatan Kedaluwarsa</CardTitle>
        <CalendarX className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {expiringItems.map((item, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-muted-foreground">({item.daysLeft} hari lagi)</span>
              </div>
              <Badge variant={item.status === "Segera Habis" ? "destructive" : "secondary"}>{item.status}</Badge>
            </li>
          ))}
        </ul>
        {expiringItems.length === 0 && (
          <p className="text-sm text-muted-foreground">Tidak ada item yang akan kedaluwarsa.</p>
        )}
      </CardContent>
    </Card>
  )
}
