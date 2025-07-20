"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { InventoryEdit } from "@/components/inventory-edit"
import type { InventoryItem } from "@/types/inventory"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"

export function InventoryTable() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token
    if (!token) {
      console.error("Token tidak ditemukan")
      return
    }

    const res = await fetch("/api/inventory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    if (Array.isArray(data)) {
      setInventoryData(data)
    } else {
      console.error("Data bukan array:", data)
    }
  }

  const getStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diff <= 0) return "critical"
    if (diff <= 3) return "warning"
    return "good"
  }

  const filteredData = inventoryData.filter((item) => {
    const search = searchTerm.toLowerCase()
    const status = getStatus(item.expiry_date || "")
    return (
      (item.name?.toLowerCase().includes(search) || item.category?.toLowerCase().includes(search)) &&
      (filterStatus === "all" || filterStatus === status)
    )
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Kritis</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Peringatan</Badge>
      case "good":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Baik</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDaysLeft = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return "Kedaluwarsa"
    if (diffDays === 0) return "Hari ini"
    if (diffDays === 1) return "Besok"
    return `${diffDays} hari`
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detail Inventaris</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>Semua Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("critical")}>Kritis</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("warning")}>Peringatan</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("good")}>Baik</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Item</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Kedaluwarsa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Biaya</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity ?? 0} {item.unit ?? ""}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{getDaysLeft(item.expiry_date)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.expiry_date).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(getStatus(item.expiry_date))}</TableCell>
                  <TableCell>
                    Rp {(item.cost ?? 0).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => {
                            setSelectedItem(item)
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InventoryEdit
        open={isEditOpen}
        item={selectedItem}
        onClose={() => setIsEditOpen(false)}
        onSave={async (updatedItem) => {
          const session = await supabase.auth.getSession()
          const token = session.data.session?.access_token
          if (!token) return

          const res = await fetch(`/api/inventory/${updatedItem.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedItem),
          })

          if (res.ok) {
            toast({
              title: "Berhasil",
              description: "Item berhasil diupdate.",
            })
            setIsEditOpen(false)
            setSelectedItem(null)
            await fetchInventory()
          } else {
            const err = await res.json()
            toast({
              variant: "destructive",
              title: "Gagal Update",
              description: err.message,
            })
          }
        }}
      />
    </>
  )
}