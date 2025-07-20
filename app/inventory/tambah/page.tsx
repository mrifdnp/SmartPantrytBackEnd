"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Calendar,
  Package,
  ArrowLeft,
  Check,
  Sparkles,
  ShoppingCart,
  Clock,
  Bot,
  Thermometer,
  Snowflake,
  Home,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  description: string;
  expirationDate: string;
  purchaseDate: string;
  hasExpiration: boolean;
  aiPredictedExpiration: string;
  storageLocation: "room" | "fridge" | "freezer" | "";
  originalExpirationDate: string;
  adjustedExpirationDate: string;
}

const mapStorageLocationToEnum = (key: "room" | "fridge" | "freezer") => {
  switch (key) {
    case "room":
      return "Suhu Ruang";
    case "fridge":
      return "Kulkas";
    case "freezer":
      return "Freezer";
    default:
      return "";
  }
};


export default function TambahProdukPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "",
    quantity: 1,
    unit: "pcs",
    description: "",
    expirationDate: "",
    purchaseDate: "",
    hasExpiration: false,
    aiPredictedExpiration: "",
    storageLocation: "",
    originalExpirationDate: "",
    adjustedExpirationDate: "",
  });

  const [isOCRProcessing, setIsOCRProcessing] = useState(false);
  const [isAIPredicting, setIsAIPredicting] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [step, setStep] = useState<
    | "product-name"
    | "expiration-check"
    | "expiration-input"
    | "storage-selection"
    | "purchase-date"
    | "final"
  >("product-name");

  const getStepProgress = () => {
    const steps = [
      "product-name",
      "expiration-check",
      "expiration-input",
      "storage-selection",
      "purchase-date",
      "final",
    ];
    const currentIndex = steps.indexOf(step);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  // Storage location effects on shelf life
  const getStorageMultiplier = (
    location: string,
    productType: string
  ): number => {
    const baseMultipliers = {
      room: 1,
      fridge: 1.5, // 50% longer
      freezer: 3, // 3x longer
    };

    // Special cases for different product types
    if (productType.includes("susu") || productType.includes("dairy")) {
      return location === "room" ? 0.5 : location === "fridge" ? 2 : 10;
    }
    if (productType.includes("daging") || productType.includes("frozen")) {
      return location === "room" ? 0.3 : location === "fridge" ? 1.5 : 5;
    }
    if (productType.includes("sayur") || productType.includes("buah")) {
      return location === "room" ? 1 : location === "fridge" ? 2.5 : 4;
    }
    if (productType.includes("roti") || productType.includes("biskuit")) {
      return location === "room" ? 1 : location === "fridge" ? 1.2 : 2;
    }

    return baseMultipliers[location as keyof typeof baseMultipliers] || 1;
  };

  // Calculate adjusted expiration date based on storage
  const calculateAdjustedExpiration = (
    originalDate: string,
    storageLocation: string,
    productName: string
  ) => {
    if (!originalDate || !storageLocation) return originalDate;

    const original = new Date(originalDate);
    const multiplier = getStorageMultiplier(
      storageLocation,
      productName.toLowerCase()
    );

    // Calculate days from now to original expiration
    const now = new Date();
    const daysFromNow = Math.ceil(
      (original.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Apply multiplier
    const adjustedDays = Math.round(daysFromNow * multiplier);
    const adjustedDate = new Date(
      now.getTime() + adjustedDays * 24 * 60 * 60 * 1000
    );
    return adjustedDate.toISOString().split("T")[0];
  };
  const supabase = createClientComponentClient();
  // Simulasi OCR untuk nama produk
  const handleProductNameOCR = async (file: File) => {
    setIsOCRProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const mockOCRResults = [
        "Indomie Goreng Original",
        "Teh Botol Sosro 450ml",
        "Biskuit Roma Kelapa",
        "Susu Ultra Milk Full Cream",
        "Minyak Bimoli 2L",
        "Beras Premium 5kg",
        "Gula Pasir Gulaku",
        "Kecap Manis ABC",
        "Mie Sedaap Goreng",
        "Air Mineral Aqua 600ml",
      ];

      const detectedName =
        mockOCRResults[Math.floor(Math.random() * mockOCRResults.length)];
      setProductData((prev) => ({
        ...prev,
        name: detectedName,
        category: getCategoryFromName(detectedName),
      }));

      toast({
        title: "🎉 OCR Berhasil!",
        description: `Nama produk terdeteksi: ${detectedName}`,
      });

      setTimeout(() => setStep("expiration-check"), 1000);
    } catch (error) {
      toast({
        title: "❌ OCR Gagal",
        description: "Gagal mendeteksi nama produk. Silakan input manual.",
        variant: "destructive",
      });
    } finally {
      setIsOCRProcessing(false);
    }
  };

  const getCategoryFromName = (name: string): string => {
    const categories = {
      indomie: "Makanan Instan",
      mie: "Makanan Instan",
      teh: "Minuman",
      susu: "Minuman",
      biskuit: "Snack",
      minyak: "Bumbu & Minyak",
      beras: "Bahan Pokok",
      gula: "Bumbu & Minyak",
      kecap: "Bumbu & Minyak",
      aqua: "Minuman",
      air: "Minuman",
    };

    const lowerName = name.toLowerCase();
    for (const [key, category] of Object.entries(categories)) {
      if (lowerName.includes(key)) {
        return category;
      }
    }
    return "Lainnya";
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleProductNameOCR(file);
    }
  };

  const handleStorageSelection = (location: "room" | "fridge" | "freezer") => {
    const adjustedDate = calculateAdjustedExpiration(
      productData.originalExpirationDate || productData.expirationDate,
      location,
      productData.name
    );

    setProductData((prev) => ({
      ...prev,
      storageLocation: location,
      adjustedExpirationDate: adjustedDate,
      expirationDate: adjustedDate,
    }));

    const locationNames = {
      room: "Suhu Ruangan",
      fridge: "Lemari Es",
      freezer: "Freezer",
    };

    toast({
      title: "📍 Tempat Penyimpanan Dipilih!",
      description: `Disimpan di ${locationNames[location]}. Tanggal kedaluwarsa disesuaikan.`,
    });

    setTimeout(() => setStep("final"), 1000);
  };

  const handleSubmit = async () => {
    try {
      if (!productData.name || !productData.category) {
        toast({
          title: "⚠️ Data Tidak Lengkap",
          description: "Nama produk dan kategori harus diisi.",
          variant: "destructive",
        });
        return;
      }

      // Ambil token dari session Supabase
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) {
        toast({
          title: "❌ Autentikasi Gagal",
          description: "Silakan login kembali.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productData.name,
          category: productData.category,
          quantity: productData.quantity,
          unit: productData.unit,
          location: mapStorageLocationToEnum(productData.storageLocation),
          expiry_date: productData.expirationDate || null,
          cost: null, // atau tambahkan jika kamu punya
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan produk.");
      }

      toast({
        title: "✅ Produk Berhasil Ditambahkan!",
        description: `${productData.name} telah disimpan ke inventaris.`,
      });

      router.push("/inventory");
    } catch (error) {
      toast({
        title: "❌ Gagal Menyimpan",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleAIPrediction = async () => {
    setIsAIPredicting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const mockAIPredictionResults = [
        "2024-01-01",
        "2024-02-15",
        "2024-03-30",
        "2024-05-01",
        "2024-06-15",
        "2024-07-30",
        "2024-09-01",
        "2024-10-15",
        "2024-11-30",
        "2024-12-01",
      ];

      const predictedDate =
        mockAIPredictionResults[
          Math.floor(Math.random() * mockAIPredictionResults.length)
        ];
      setProductData((prev) => ({
        ...prev,
        aiPredictedExpiration: predictedDate,
        expirationDate: predictedDate,
        originalExpirationDate: predictedDate,
      }));

      toast({
        title: "🎉 AI Prediksi Berhasil!",
        description: `Tanggal kedaluwarsa diprediksi: ${predictedDate}`,
      });

      setTimeout(() => setStep("storage-selection"), 1000);
    } catch (error) {
      toast({
        title: "❌ AI Prediksi Gagal",
        description:
          "Gagal memprediksi tanggal kedaluwarsa. Silakan input manual.",
        variant: "destructive",
      });
    } finally {
      setIsAIPredicting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "product-name":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                Identifikasi Produk
              </CardTitle>
              <p className="text-cyan-100 mt-2">
                Gunakan OCR untuk mendeteksi nama produk secara otomatis
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* OCR Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">
                      📸 Scan Kemasan
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arahkan kamera ke nama produk pada kemasan
                    </p>
                  </div>
                  <Button
                    onClick={() => handleCameraCapture()}
                    disabled={isOCRProcessing}
                    className="w-full h-40 flex-col gap-4 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
                    size="lg"
                  >
                    {isOCRProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                        <div className="text-center">
                          <div className="font-semibold">Memproses OCR...</div>
                          <div className="text-sm opacity-90">
                            Mendeteksi teks dari gambar
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Camera className="h-12 w-12" />
                        <div className="text-center">
                          <div className="font-semibold">Ambil Foto</div>
                          <div className="text-sm opacity-90">
                            Tap untuk membuka kamera
                          </div>
                        </div>
                      </>
                    )}
                  </Button>
                  {capturedImage && (
                    <div className="mt-6 space-y-3">
                      <Label className="text-sm font-medium">
                        Gambar yang Dipindai:
                      </Label>
                      <div className="relative">
                        <img
                          src={capturedImage || "/placeholder.svg"}
                          alt="Captured"
                          className="w-full max-w-sm mx-auto rounded-xl border-2 border-gray-200 shadow-md"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Manual Input Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">
                      ✏️ Input Manual
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Atau ketik nama produk secara manual
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="manual-name"
                        className="text-sm font-medium"
                      >
                        Nama Produk
                      </Label>
                      <Input
                        id="manual-name"
                        placeholder="Contoh: Indomie Goreng Original"
                        value={productData.name}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            name: e.target.value,
                            category: getCategoryFromName(e.target.value),
                          }))
                        }
                        className="h-12 text-base"
                      />
                    </div>
                    {productData.name && (
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                        <div className="flex items-center gap-2 text-emerald-700 mb-2">
                          <Check className="h-5 w-5" />
                          <span className="font-semibold">
                            Produk Terdeteksi
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Nama:</span>{" "}
                            {productData.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              Kategori:
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-emerald-100 text-emerald-800"
                            >
                              {productData.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {productData.name && (
                <div className="pt-6 border-t">
                  <Button
                    onClick={() => setStep("expiration-check")}
                    className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold"
                    size="lg"
                  >
                    Lanjut ke Langkah Berikutnya
                    <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "expiration-check":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                Cek Tanggal Kedaluwarsa
              </CardTitle>
              <p className="text-amber-100 mt-2">
                Apakah produk <strong>{productData.name}</strong> memiliki
                tanggal kedaluwarsa?
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      hasExpiration: true,
                    }));
                    setStep("expiration-input");
                  }}
                  variant="outline"
                  className="h-32 flex-col gap-4 border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
                >
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <Check className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-emerald-700">
                      Ya, Ada Tanggal
                    </div>
                    <div className="text-sm text-emerald-600">
                      Produk memiliki tanggal kedaluwarsa
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    setProductData((prev) => ({
                      ...prev,
                      hasExpiration: false,
                      expirationDate: "",
                    }));
                    setStep("purchase-date");
                  }}
                  variant="outline"
                  className="h-32 flex-col gap-4 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
                >
                  <div className="p-3 bg-violet-100 rounded-full">
                    <ShoppingCart className="h-8 w-8 text-violet-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-violet-700">
                      Tidak Ada Tanggal
                    </div>
                    <div className="text-sm text-violet-600">
                      Gunakan AI untuk prediksi
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "expiration-input":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                Input Tanggal Kedaluwarsa
              </CardTitle>
              <p className="text-rose-100 mt-2">
                Masukkan tanggal kedaluwarsa produk secara manual
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">
                    📝 Input Manual
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pilih tanggal kedaluwarsa dari kemasan produk
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="manual-date"
                      className="text-sm font-medium"
                    >
                      Tanggal Kedaluwarsa
                    </Label>
                    <Input
                      id="manual-date"
                      type="date"
                      value={productData.expirationDate}
                      onChange={(e) =>
                        setProductData((prev) => ({
                          ...prev,
                          expirationDate: e.target.value,
                          originalExpirationDate: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  {productData.expirationDate && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Check className="h-5 w-5" />
                        <span className="font-semibold">
                          Tanggal:{" "}
                          {new Date(
                            productData.expirationDate
                          ).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {productData.expirationDate && (
                  <div className="pt-6 border-t">
                    <Button
                      onClick={() => setStep("storage-selection")}
                      className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold"
                      size="lg"
                    >
                      Lanjut Pilih Tempat Penyimpanan
                      <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case "storage-selection":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Thermometer className="h-6 w-6" />
                </div>
                Pilih Tempat Penyimpanan
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Dimana Anda akan menyimpan <strong>{productData.name}</strong>?
                Ini akan mempengaruhi tanggal kedaluwarsa.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button
                  onClick={() => handleStorageSelection("room")}
                  variant="outline"
                  className="h-40 flex-col gap-4 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
                >
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Home className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-700">
                      Suhu Ruangan
                    </div>
                    <div className="text-sm text-orange-600">20-25°C</div>
                    <div className="text-xs text-orange-500 mt-1">
                      Durasi standar
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleStorageSelection("fridge")}
                  variant="outline"
                  className="h-40 flex-col gap-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Thermometer className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-700">Lemari Es</div>
                    <div className="text-sm text-blue-600">2-8°C</div>
                    <div className="text-xs text-blue-500 mt-1">
                      Lebih tahan lama
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleStorageSelection("freezer")}
                  variant="outline"
                  className="h-40 flex-col gap-4 border-2 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200"
                >
                  <div className="p-3 bg-cyan-100 rounded-full">
                    <Snowflake className="h-8 w-8 text-cyan-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-cyan-700">Freezer</div>
                    <div className="text-sm text-cyan-600">-18°C</div>
                    <div className="text-xs text-cyan-500 mt-1">
                      Paling tahan lama
                    </div>
                  </div>
                </Button>
              </div>

              {productData.originalExpirationDate && (
                <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Perbandingan Tanggal Kedaluwarsa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-medium text-orange-700 mb-1">
                        Suhu Ruangan
                      </div>
                      <div className="text-orange-600">
                        {new Date(
                          calculateAdjustedExpiration(
                            productData.originalExpirationDate,
                            "room",
                            productData.name
                          )
                        ).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-700 mb-1">
                        Lemari Es
                      </div>
                      <div className="text-blue-600">
                        {new Date(
                          calculateAdjustedExpiration(
                            productData.originalExpirationDate,
                            "fridge",
                            productData.name
                          )
                        ).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                    <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                      <div className="font-medium text-cyan-700 mb-1">
                        Freezer
                      </div>
                      <div className="text-cyan-600">
                        {new Date(
                          calculateAdjustedExpiration(
                            productData.originalExpirationDate,
                            "freezer",
                            productData.name
                          )
                        ).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "purchase-date":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                Tanggal Pembelian
              </CardTitle>
              <p className="text-indigo-100 mt-2">
                Input tanggal pembelian untuk prediksi AI yang lebih akurat
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="max-w-md mx-auto space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="purchase-date"
                    className="text-sm font-medium"
                  >
                    Kapan Anda membeli produk ini?
                  </Label>
                  <Input
                    id="purchase-date"
                    type="date"
                    value={productData.purchaseDate}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        purchaseDate: e.target.value,
                      }))
                    }
                    className="h-12 text-base"
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {productData.purchaseDate && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl">
                      <div className="flex items-center gap-2 text-sky-700 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">
                          Tanggal Pembelian Tercatat
                        </span>
                      </div>
                      <p className="text-sm text-sky-600">
                        {new Date(productData.purchaseDate).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <Button
                      onClick={handleAIPrediction}
                      disabled={isAIPredicting}
                      className="w-full h-16 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold"
                      size="lg"
                    >
                      {isAIPredicting ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                          <div className="text-center">
                            <div>AI Sedang Memprediksi...</div>
                            <div className="text-sm opacity-90">
                              Menganalisis jenis produk
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Bot className="h-6 w-6" />
                          <div className="text-center">
                            <div>Prediksi dengan AI</div>
                            <div className="text-sm opacity-90">
                              Berdasarkan jenis produk & tanggal beli
                            </div>
                          </div>
                        </div>
                      )}
                    </Button>
                    {productData.aiPredictedExpiration && (
                      <div className="p-6 bg-gradient-to-r from-lime-50 to-green-50 border-2 border-lime-200 rounded-xl">
                        <div className="flex items-center gap-2 text-lime-700 mb-3">
                          <Sparkles className="h-6 w-6" />
                          <span className="font-bold text-lg">
                            AI Prediksi Berhasil!
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lime-800 font-semibold">
                            Prediksi Kedaluwarsa:{" "}
                            {new Date(
                              productData.aiPredictedExpiration
                            ).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-lime-600">
                            Berdasarkan analisis jenis produk "
                            {productData.name}" dan tanggal pembelian
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {productData.aiPredictedExpiration && (
                  <div className="pt-6 border-t">
                    <Button
                      onClick={() => setStep("storage-selection")}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold"
                      size="lg"
                    >
                      Pilih Tempat Penyimpanan
                      <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case "final":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                Finalisasi Produk
              </CardTitle>
              <p className="text-emerald-100 mt-2">
                Review dan edit semua detail produk Anda
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Editable Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="final-name"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Nama Produk
                  </Label>
                  <Input
                    id="final-name"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="final-category"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Kategori
                  </Label>
                  <Select
                    value={productData.category}
                    onValueChange={(value) =>
                      setProductData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bahan Pokok">
                        🌾 Bahan Pokok
                      </SelectItem>
                      <SelectItem value="Makanan Instan">
                        🍜 Makanan Instan
                      </SelectItem>
                      <SelectItem value="Minuman">🥤 Minuman</SelectItem>
                      <SelectItem value="Snack">🍪 Snack</SelectItem>
                      <SelectItem value="Bumbu & Minyak">
                        🧂 Bumbu & Minyak
                      </SelectItem>
                      <SelectItem value="Frozen Food">
                        🧊 Frozen Food
                      </SelectItem>
                      <SelectItem value="Dairy">🥛 Produk Susu</SelectItem>
                      <SelectItem value="Lainnya">📦 Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="final-quantity"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Jumlah
                  </Label>
                  <Input
                    id="final-quantity"
                    type="number"
                    min="1"
                    value={productData.quantity}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        quantity: Number.parseInt(e.target.value) || 1,
                      }))
                    }
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="final-unit"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Satuan
                  </Label>
                  <Select
                    value={productData.unit}
                    onValueChange={(value) =>
                      setProductData((prev) => ({ ...prev, unit: value }))
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">Pcs</SelectItem>
                      <SelectItem value="kg">Kg</SelectItem>
                      <SelectItem value="gram">Gram</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="ml">ML</SelectItem>
                      <SelectItem value="pack">Pack</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="botol">Botol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Editable Dates and Storage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productData.purchaseDate && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="final-purchase-date"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Tanggal Pembelian
                    </Label>
                    <Input
                      id="final-purchase-date"
                      type="date"
                      value={productData.purchaseDate}
                      onChange={(e) =>
                        setProductData((prev) => ({
                          ...prev,
                          purchaseDate: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                    />
                  </div>
                )}
                {productData.expirationDate && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="final-expiration-date"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Tanggal Kedaluwarsa
                    </Label>
                    <Input
                      id="final-expiration-date"
                      type="date"
                      value={productData.expirationDate}
                      onChange={(e) =>
                        setProductData((prev) => ({
                          ...prev,
                          expirationDate: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                    />
                  </div>
                )}
              </div>

              {/* Storage Location Selection */}
              {productData.storageLocation && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Tempat Penyimpanan
                  </Label>
                  <Select
                    value={productData.storageLocation}
                    onValueChange={(value: "room" | "fridge" | "freezer") => {
                      const adjustedDate = calculateAdjustedExpiration(
                        productData.originalExpirationDate ||
                          productData.expirationDate,
                        value,
                        productData.name
                      );
                      setProductData((prev) => ({
                        ...prev,
                        storageLocation: value,
                        adjustedExpirationDate: adjustedDate,
                        expirationDate: adjustedDate,
                      }));
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="room">🏠 Suhu Ruangan</SelectItem>
                      <SelectItem value="fridge">❄️ Lemari Es</SelectItem>
                      <SelectItem value="freezer">🧊 Freezer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="final-description"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Deskripsi (Opsional)
                </Label>
                <Textarea
                  id="final-description"
                  placeholder="Tambahkan catatan khusus tentang produk ini..."
                  value={productData.description}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[100px] text-base"
                />
              </div>

              {/* Product Summary */}
              <div className="p-6 bg-gradient-to-r from-slate-50 to-zinc-50 border-2 border-slate-200 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Ringkasan Produk
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">Nama:</span>
                      <p className="font-semibold text-gray-900">
                        {productData.name}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Kategori:
                      </span>
                      <div className="mt-1">
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-800"
                        >
                          {productData.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Jumlah:</span>
                      <p className="font-semibold text-gray-900">
                        {productData.quantity} {productData.unit}
                      </p>
                    </div>
                    {productData.storageLocation && (
                      <div>
                        <span className="font-medium text-gray-600">
                          Penyimpanan:
                        </span>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {productData.storageLocation === "room" &&
                              "🏠 Suhu Ruangan"}
                            {productData.storageLocation === "fridge" &&
                              "❄️ Lemari Es"}
                            {productData.storageLocation === "freezer" &&
                              "🧊 Freezer"}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {productData.purchaseDate && (
                      <div>
                        <span className="font-medium text-gray-600">
                          Tanggal Beli:
                        </span>
                        <p className="font-semibold text-gray-900">
                          {new Date(
                            productData.purchaseDate
                          ).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    )}
                    {productData.expirationDate && (
                      <div>
                        <span className="font-medium text-gray-600">
                          Kedaluwarsa:
                        </span>
                        <p className="font-semibold text-gray-900">
                          {new Date(
                            productData.expirationDate
                          ).toLocaleDateString("id-ID")}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {productData.aiPredictedExpiration && (
                            <Badge
                              variant="outline"
                              className="bg-violet-50 text-violet-700 border-violet-200"
                            >
                              🤖 Prediksi AI
                            </Badge>
                          )}
                          {productData.adjustedExpirationDate &&
                            productData.storageLocation && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                📍 Disesuaikan Penyimpanan
                              </Badge>
                            )}
                        </div>
                      </div>
                    )}
                    {!productData.hasExpiration &&
                      !productData.expirationDate && (
                        <div>
                          <span className="font-medium text-gray-600">
                            Kedaluwarsa:
                          </span>
                          <p className="font-semibold text-gray-500">
                            Tidak ada
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* Storage Impact Information */}
                {productData.originalExpirationDate &&
                  productData.adjustedExpirationDate &&
                  productData.storageLocation && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Thermometer className="h-5 w-5" />
                        <span className="font-semibold">
                          Dampak Penyimpanan
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">
                        <p>
                          Tanggal asli:{" "}
                          {new Date(
                            productData.originalExpirationDate
                          ).toLocaleDateString("id-ID")}
                        </p>
                        <p>
                          Setelah penyesuaian:{" "}
                          {new Date(
                            productData.adjustedExpirationDate
                          ).toLocaleDateString("id-ID")}
                        </p>
                        <p className="font-medium mt-1">
                          {productData.storageLocation === "room" &&
                            "Disimpan pada suhu ruangan"}
                          {productData.storageLocation === "fridge" &&
                            "Masa simpan diperpanjang dengan lemari es"}
                          {productData.storageLocation === "freezer" &&
                            "Masa simpan diperpanjang signifikan dengan freezer"}
                        </p>
                      </div>
                    </div>
                  )}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg"
                size="lg"
              >
                <Package className="h-6 w-6 mr-3" />
                Simpan Produk ke Inventaris
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Inventaris
          </Button>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Tambah Produk Baru
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gunakan teknologi OCR dan AI untuk menambahkan produk dengan mudah
              dan akurat
            </p>
            {/* Progress Bar */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(getStepProgress())}%</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">{renderStepContent()}</div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
