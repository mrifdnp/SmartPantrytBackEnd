export interface InventoryItem {
  id: string
  name: string
  category: string | null
  location: string | null
  added_date: string
  expiry_date: string | null
  unit: string | null
  quantity: number | null
  cost: number | null
}
