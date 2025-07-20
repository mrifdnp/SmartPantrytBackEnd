// app/dashboard_layout/layout.tsx
import { ReactNode } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let DashboardHeader = null

  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("user_id", session.user.id)
      .single()

    const accountType = profile?.account_type

    if (accountType === "personal") {
      const mod = await import("@/components/dashboard/personal/dashboard-header")
      DashboardHeader = mod.DashboardHeader
    } else if (accountType === "business") {
      const mod = await import("@/components/dashboard/business/dashboard-header")
      DashboardHeader = mod.DashboardHeader
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {DashboardHeader && <DashboardHeader />}
      <main className="container mx-auto px-4 py-10">{children}</main>
    </div>
  )
}
