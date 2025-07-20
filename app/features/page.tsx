import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecipeSuggestions } from "@/components/features/recipe-suggestions"
import { ShoppingListGenerator } from "@/components/features/shopping-list-generator"
import { WasteAnalytics } from "@/components/features/waste-analytics"
import { CollaborativePlanning } from "@/components/features/collaborative-planning"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fitur Advanced</h1>
          <p className="text-gray-600">Explore fitur-fitur canggih Smart Pantry Manager</p>
        </div>

        <Tabs defaultValue="recipes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recipes">Recipe AI</TabsTrigger>
            <TabsTrigger value="shopping">Smart Shopping</TabsTrigger>
            <TabsTrigger value="analytics">Waste Analytics</TabsTrigger>
            <TabsTrigger value="collaboration">Team Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes">
            <RecipeSuggestions />
          </TabsContent>

          <TabsContent value="shopping">
            <ShoppingListGenerator />
          </TabsContent>

          <TabsContent value="analytics">
            <WasteAnalytics />
          </TabsContent>

          <TabsContent value="collaboration">
            <CollaborativePlanning />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
