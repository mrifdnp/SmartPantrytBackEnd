"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  WifiOff,
  Wifi,
  Download,
  Upload,
  Database,
  FolderSyncIcon as Sync,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

const offlineData = {
  isOnline: true,
  lastSync: "2025-01-13 14:30:00",
  pendingChanges: 3,
  cachedItems: 127,
  storageUsed: 2.4, // MB
  storageLimit: 50, // MB
  autoSync: true,
}

const pendingChanges = [
  {
    id: 1,
    type: "add",
    item: "Tomat Cherry",
    quantity: "1kg",
    timestamp: "2025-01-13 15:45:00",
    status: "pending",
  },
  {
    id: 2,
    type: "update",
    item: "Beras Premium",
    change: "quantity: 5kg → 3kg",
    timestamp: "2025-01-13 15:30:00",
    status: "pending",
  },
  {
    id: 3,
    type: "delete",
    item: "Roti Tawar",
    reason: "expired",
    timestamp: "2025-01-13 15:15:00",
    status: "pending",
  },
]

const offlineFeatures = [
  {
    feature: "View Inventory",
    available: true,
    description: "Lihat semua item yang sudah di-cache",
  },
  {
    feature: "Add/Edit Items",
    available: true,
    description: "Tambah atau edit item (akan di-sync nanti)",
  },
  {
    feature: "Basic Analytics",
    available: true,
    description: "Lihat statistik dari data lokal",
  },
  {
    feature: "Recipe Suggestions",
    available: false,
    description: "Memerlukan koneksi internet untuk AI",
  },
  {
    feature: "Shopping List Sync",
    available: false,
    description: "Sync dengan anggota tim memerlukan internet",
  },
  {
    feature: "Voice Assistant",
    available: false,
    description: "Memerlukan koneksi untuk speech processing",
  },
]

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(offlineData.isOnline)
  const [isSyncing, setIsSyncing] = useState(false)
  const [autoSync, setAutoSync] = useState(offlineData.autoSync)

  // Simulate network status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle online status for demo
      if (Math.random() < 0.1) {
        setIsOnline((prev) => !prev)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleManualSync = () => {
    setIsSyncing(true)
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
    }, 3000)
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "add":
        return "➕"
      case "update":
        return "✏️"
      case "delete":
        return "🗑️"
      default:
        return "📝"
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case "add":
        return "text-green-600"
      case "update":
        return "text-blue-600"
      case "delete":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
            Offline Mode
            <Badge className={isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Auto Sync</span>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div
          className={`p-4 rounded-lg border-l-4 ${
            isOnline ? "bg-green-50 border-l-green-500" : "bg-red-50 border-l-red-500"
          }`}
        >
          <div className="flex items-center gap-3">
            {isOnline ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <div className={`font-medium ${isOnline ? "text-green-900" : "text-red-900"}`}>
                {isOnline ? "Connected to Internet" : "Working Offline"}
              </div>
              <div className={`text-sm ${isOnline ? "text-green-700" : "text-red-700"}`}>
                {isOnline
                  ? `Last sync: ${new Date(offlineData.lastSync).toLocaleString("id-ID")}`
                  : "Changes will be synced when connection is restored"}
              </div>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Cached Items</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{offlineData.cachedItems}</div>
            <div className="text-sm text-blue-700">Available offline</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Pending Changes</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">{offlineData.pendingChanges}</div>
            <div className="text-sm text-purple-700">Waiting to sync</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-900">Storage Used</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">{offlineData.storageUsed}MB</div>
            <div className="text-sm text-orange-700">of {offlineData.storageLimit}MB</div>
          </div>
        </div>

        {/* Storage Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Local Storage Usage</span>
            <span>
              {offlineData.storageUsed}MB / {offlineData.storageLimit}MB
            </span>
          </div>
          <Progress value={(offlineData.storageUsed / offlineData.storageLimit) * 100} className="h-2" />
        </div>

        {/* Sync Controls */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Manual Sync</h3>
            <p className="text-sm text-gray-600">
              {isOnline ? "Sync pending changes now" : "Will sync when connection is restored"}
            </p>
          </div>
          <Button
            onClick={handleManualSync}
            disabled={!isOnline || isSyncing || offlineData.pendingChanges === 0}
            className="gap-2"
          >
            <Sync className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
        </div>

        {/* Pending Changes */}
        {offlineData.pendingChanges > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Pending Changes ({offlineData.pendingChanges})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingChanges.map((change) => (
                  <div key={change.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getChangeIcon(change.type)}</span>
                      <div>
                        <div className={`font-medium ${getChangeColor(change.type)}`}>
                          {change.type.charAt(0).toUpperCase() + change.type.slice(1)}: {change.item}
                        </div>
                        <div className="text-sm text-gray-600">{change.change || change.quantity || change.reason}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(change.timestamp).toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {change.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offline Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {offlineFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${feature.available ? "bg-green-500" : "bg-red-500"}`} />
                    <div>
                      <div className="font-medium">{feature.feature}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                  <Badge className={feature.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {feature.available ? "Available" : "Requires Internet"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Offline Mode Tips</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Semua perubahan disimpan lokal dan akan di-sync otomatis</li>
                <li>• Fitur AI memerlukan koneksi internet untuk bekerja optimal</li>
                <li>• Data di-cache hingga 30 hari untuk akses offline</li>
                <li>• Aktifkan auto-sync untuk sinkronisasi otomatis</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
