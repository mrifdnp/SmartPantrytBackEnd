import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { VoiceAssistant } from "@/components/features/voice-assistant"
import { ARScanner } from "@/components/features/ar-scanner"
import { SmartNotifications } from "@/components/features/smart-notifications"
import { Gamification } from "@/components/features/gamification"
import { OfflineMode } from "@/components/features/offline-mode"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdvancedFeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Features</h1>
          <p className="text-gray-600">Fitur-fitur canggih dan inovatif Smart Pantry Manager</p>
        </div>

        <Tabs defaultValue="voice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="voice">Voice AI</TabsTrigger>
            <TabsTrigger value="ar">AR Scanner</TabsTrigger>
            <TabsTrigger value="notifications">Smart Alerts</TabsTrigger>
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
            <TabsTrigger value="offline">Offline Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="voice">
            <VoiceAssistant />
          </TabsContent>

          <TabsContent value="ar">
            <ARScanner />
          </TabsContent>

          <TabsContent value="notifications">
            <SmartNotifications />
          </TabsContent>

          <TabsContent value="gamification">
            <Gamification />
          </TabsContent>

          <TabsContent value="offline">
            <OfflineMode />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
