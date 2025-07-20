"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Scan, Zap, Eye, Target, Sparkles } from "lucide-react"

const mockScanResults = [
  {
    item: "Tomat Cherry",
    confidence: 94,
    freshness: 85,
    expiryDays: 5,
    nutritionScore: 92,
    price: 15000,
    alternatives: ["Tomat Biasa", "Tomat Roma"],
  },
  {
    item: "Brokoli",
    confidence: 89,
    freshness: 78,
    expiryDays: 3,
    nutritionScore: 96,
    price: 12000,
    alternatives: ["Kembang Kol", "Bayam"],
  },
]

export function ARScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    setCameraActive(true)
    // In real implementation, would access camera
    // navigator.mediaDevices.getUserMedia({ video: true })
  }

  const stopCamera = () => {
    setCameraActive(false)
    setScanResult(null)
  }

  const startScan = () => {
    setIsScanning(true)
    setScanResult(null)

    // Simulate scanning process
    setTimeout(() => {
      const result = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setScanResult(result)
      setIsScanning(false)
    }, 3000)
  }

  const getFreshnessColor = (freshness: number) => {
    if (freshness >= 80) return "text-green-600"
    if (freshness >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getFreshnessLabel = (freshness: number) => {
    if (freshness >= 80) return "Sangat Segar"
    if (freshness >= 60) return "Cukup Segar"
    return "Kurang Segar"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          AR Food Scanner
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Vision
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera View */}
        <div className="relative">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
            {cameraActive ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Camera Feed Active</p>

                  {/* Scanning Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-blue-400 rounded-lg w-48 h-48 relative animate-pulse">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Target className="w-8 h-8 text-blue-400 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Kamera tidak aktif</p>
                  <p className="text-sm opacity-75">Tekan tombol untuk mulai</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!cameraActive ? (
            <Button onClick={startCamera} className="gap-2">
              <Camera className="w-4 h-4" />
              Aktifkan Kamera
            </Button>
          ) : (
            <>
              <Button
                onClick={startScan}
                disabled={isScanning}
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Scan className="w-4 h-4" />
                {isScanning ? "Scanning..." : "Scan Item"}
              </Button>
              <Button variant="outline" onClick={stopCamera}>
                Stop
              </Button>
            </>
          )}
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Analyzing image...</span>
              <span>67%</span>
            </div>
            <Progress value={67} className="h-2" />
            <div className="text-xs text-gray-500 text-center">
              🔍 Identifying food items • 🧠 Analyzing freshness • 📊 Calculating nutrition
            </div>
          </div>
        )}

        {/* Scan Results */}
        {scanResult && (
          <div className="space-y-4 border-t pt-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{scanResult.item}</h3>
                <Badge className="bg-green-100 text-green-800">{scanResult.confidence}% match</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Kesegaran:</span>
                    <span className={`text-sm font-medium ${getFreshnessColor(scanResult.freshness)}`}>
                      {getFreshnessLabel(scanResult.freshness)}
                    </span>
                  </div>
                  <Progress value={scanResult.freshness} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nutrition Score:</span>
                    <span className="text-sm font-medium text-blue-600">{scanResult.nutritionScore}/100</span>
                  </div>
                  <Progress value={scanResult.nutritionScore} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Estimasi Expired:</span>
                  <div className="font-medium">{scanResult.expiryDays} hari lagi</div>
                </div>
                <div>
                  <span className="text-gray-600">Harga Estimasi:</span>
                  <div className="font-medium">Rp {scanResult.price.toLocaleString("id-ID")}</div>
                </div>
              </div>

              {scanResult.alternatives && (
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Alternatif serupa:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {scanResult.alternatives.map((alt: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  Tambah ke Inventaris
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Lihat Detail
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Instant Recognition</div>
            <div className="text-xs text-gray-600">AI identifies 1000+ food items</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <Eye className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Freshness Analysis</div>
            <div className="text-xs text-gray-600">Computer vision quality check</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Smart Suggestions</div>
            <div className="text-xs text-gray-600">Personalized recommendations</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
