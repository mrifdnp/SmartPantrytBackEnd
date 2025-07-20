import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AIMealPlanner } from "@/components/features/ai-meal-planner"
import { SmartKitchenIntegration } from "@/components/features/smart-kitchen-integration"
import { SocialFoodSharing } from "@/components/features/social-food-sharing"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SuperFeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Features</h1>
          <p className="text-gray-600">Fitur-fitur revolusioner yang mengubah cara Anda mengelola makanan</p>
        </div>

        <Tabs defaultValue="meal-planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meal-planner">AI Meal Planner</TabsTrigger>
            <TabsTrigger value="smart-kitchen">Smart Kitchen</TabsTrigger>
            <TabsTrigger value="social-sharing">Social Community</TabsTrigger>
          </TabsList>

          <TabsContent value="meal-planner">
            <AIMealPlanner />
          </TabsContent>

          <TabsContent value="smart-kitchen">
            <SmartKitchenIntegration />
          </TabsContent>

          <TabsContent value="social-sharing">
            <SocialFoodSharing />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
