"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, MessageCircle, UserPlus, Clock, CheckCircle, AlertCircle } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Wijaya",
    role: "Head Chef",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    permissions: ["create", "edit", "delete"],
    joinedAt: "2025-01-01",
  },
  {
    id: 2,
    name: "Ahmad Fauzi",
    role: "Sous Chef",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    permissions: ["create", "edit"],
    joinedAt: "2025-01-05",
  },
  {
    id: 3,
    name: "Lisa Permata",
    role: "Kitchen Staff",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    permissions: ["view", "edit"],
    joinedAt: "2025-01-10",
  },
]

const mealPlans = [
  {
    id: 1,
    title: "Menu Minggu Ini",
    description: "Planning menu untuk 13-19 Januari 2025",
    createdBy: "Sarah Wijaya",
    assignedTo: ["Ahmad Fauzi", "Lisa Permata"],
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-19",
    meals: [
      { day: "Senin", lunch: "Nasi Gudeg", dinner: "Sup Ayam", status: "planned" },
      { day: "Selasa", lunch: "Gado-gado", dinner: "Rendang", status: "planned" },
      { day: "Rabu", lunch: "Soto Betawi", dinner: "Ikan Bakar", status: "cooking" },
    ],
    ingredients: ["Ayam (2kg)", "Beras (5kg)", "Sayuran Mix (1kg)"],
    comments: [
      {
        user: "Ahmad Fauzi",
        message: "Untuk rendang, saya suggest pakai daging dari supplier baru",
        time: "2 jam lalu",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        user: "Lisa Permata",
        message: "Stock sayuran untuk gado-gado sudah ready",
        time: "1 jam lalu",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    title: "Prep List Besok",
    description: "Persiapan bahan untuk esok hari",
    createdBy: "Ahmad Fauzi",
    assignedTo: ["Lisa Permata"],
    status: "pending",
    priority: "medium",
    dueDate: "2025-01-14",
    meals: [],
    ingredients: ["Potong sayuran", "Marinasi ayam", "Siapkan bumbu"],
    comments: [],
  },
]

const roles = [
  { value: "head-chef", label: "Head Chef", permissions: ["create", "edit", "delete", "manage-users"] },
  { value: "sous-chef", label: "Sous Chef", permissions: ["create", "edit", "assign"] },
  { value: "kitchen-staff", label: "Kitchen Staff", permissions: ["view", "edit", "comment"] },
  { value: "viewer", label: "Viewer", permissions: ["view", "comment"] },
]

export function CollaborativePlanning() {
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState("")
  const [activeTab, setActiveTab] = useState("plans")
  const [newComment, setNewComment] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Collaborative Kitchen Planning
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">{teamMembers.length} anggota aktif</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plans">Meal Plans</TabsTrigger>
              <TabsTrigger value="team">Tim & Roles</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-900">3</div>
                  <div className="text-sm text-blue-700">Active Plans</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-900">12</div>
                  <div className="text-sm text-green-700">Completed Tasks</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-900">5</div>
                  <div className="text-sm text-yellow-700">Pending Reviews</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-900">48h</div>
                  <div className="text-sm text-purple-700">Avg. Completion</div>
                </div>
              </div>

              {/* Meal Plans */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Current Meal Plans</h3>
                  <Button className="gap-2">
                    <Calendar className="w-4 h-4" />
                    New Plan
                  </Button>
                </div>

                {mealPlans.map((plan) => (
                  <Card key={plan.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{plan.title}</h3>
                            <Badge className={getStatusColor(plan.status)}>{plan.status.replace("-", " ")}</Badge>
                            {getPriorityIcon(plan.priority)}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Dibuat oleh {plan.createdBy}</span>
                            <span>Due: {new Date(plan.dueDate).toLocaleDateString("id-ID")}</span>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {plan.assignedTo.map((person, index) => (
                            <Avatar key={index} className="w-8 h-8 border-2 border-white">
                              <AvatarFallback className="text-xs">
                                {person
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      {plan.meals.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Menu Planning:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {plan.meals.map((meal, index) => (
                              <div key={index} className="bg-gray-50 rounded p-3">
                                <div className="font-medium text-sm">{meal.day}</div>
                                <div className="text-xs text-gray-600">
                                  Lunch: {meal.lunch}
                                  <br />
                                  Dinner: {meal.dinner}
                                </div>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {meal.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {plan.ingredients.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Required Ingredients:</h4>
                          <div className="flex flex-wrap gap-2">
                            {plan.ingredients.map((ingredient, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {plan.comments.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Recent Comments ({plan.comments.length})
                          </h4>
                          <div className="space-y-3">
                            {plan.comments.map((comment, index) => (
                              <div key={index} className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {comment.user
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="font-medium text-sm">{comment.user}</div>
                                    <div className="text-sm text-gray-700">{comment.message}</div>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">{comment.time}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Input
                              placeholder="Tambah komentar..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm">Kirim</Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              {/* Add New Member */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Undang Anggota Baru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Email anggota baru"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button>Undang</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Anggota Tim</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                member.status === "online" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.role}</div>
                            <div className="text-xs text-gray-500">
                              Bergabung {new Date(member.joinedAt).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex flex-wrap gap-1 justify-end mb-1">
                              {member.permissions.map((permission, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                            <div
                              className={`text-xs ${member.status === "online" ? "text-green-600" : "text-gray-500"}`}
                            >
                              {member.status}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Role Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Role & Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roles.map((role) => (
                      <div key={role.value} className="border rounded-lg p-4">
                        <div className="font-medium mb-2">{role.label}</div>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: "Sarah Wijaya",
                        action: "created",
                        target: "Menu Minggu Ini",
                        time: "2 jam lalu",
                        type: "create",
                      },
                      {
                        user: "Ahmad Fauzi",
                        action: "commented on",
                        target: "Menu Minggu Ini",
                        time: "1 jam lalu",
                        type: "comment",
                      },
                      {
                        user: "Lisa Permata",
                        action: "completed",
                        target: "Prep sayuran",
                        time: "30 menit lalu",
                        type: "complete",
                      },
                      {
                        user: "Sarah Wijaya",
                        action: "assigned",
                        target: "Ahmad Fauzi to prep task",
                        time: "15 menit lalu",
                        type: "assign",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-gray-600">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.target}</span>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
