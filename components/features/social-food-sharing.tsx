"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Share2,
  Heart,
  MessageCircle,
  Users,
  MapPin,
  Clock,
  Star,
  Camera,
  Send,
  Gift,
  Leaf,
  CheckCircle,
} from "lucide-react"

const communityPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Wijaya",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Jakarta Selatan",
      level: 15,
      badge: "Eco Warrior",
    },
    type: "recipe_share",
    content: {
      title: "Sup Tomat Anti-Waste dari Tomat Overripe",
      description: "Jangan buang tomat yang sudah terlalu matang! Ini resep sup tomat yang lezat dan mudah dibuat.",
      image: "/placeholder.svg?height=300&width=400",
      ingredients: ["Tomat overripe 1kg", "Bawang bombay 1 buah", "Bawang putih 3 siung"],
      cookingTime: "30 menit",
      difficulty: "Mudah",
      wasteReduced: "1.2kg",
    },
    stats: {
      likes: 24,
      comments: 8,
      shares: 5,
      saves: 12,
    },
    timestamp: "2 jam lalu",
    tags: ["zero-waste", "vegetarian", "budget-friendly"],
  },
  {
    id: 2,
    user: {
      name: "Ahmad Fauzi",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Bandung",
      level: 12,
      badge: "Recipe Master",
    },
    type: "food_rescue",
    content: {
      title: "Free Vegetables - Expired Tomorrow",
      description: "Punya sayuran segar yang akan expired besok. Gratis untuk yang mau ambil di area Dago!",
      image: "/placeholder.svg?height=300&width=400",
      items: ["Bayam 500g", "Kangkung 300g", "Tomat 1kg"],
      location: "Dago, Bandung",
      availableUntil: "Besok jam 18:00",
      estimatedValue: "Rp 25.000",
    },
    stats: {
      likes: 18,
      comments: 15,
      shares: 8,
      interested: 6,
    },
    timestamp: "4 jam lalu",
    tags: ["food-rescue", "free", "bandung"],
  },
  {
    id: 3,
    user: {
      name: "Lisa Permata",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Surabaya",
      level: 18,
      badge: "Community Hero",
    },
    type: "achievement",
    content: {
      title: "30 Days Zero Waste Challenge Completed! 🎉",
      description:
        "Berhasil menyelesaikan challenge 30 hari tanpa limbah makanan! Total menghemat Rp 450.000 dan mengurangi 15kg limbah.",
      image: "/placeholder.svg?height=300&width=400",
      achievements: ["Zero Waste Master", "Money Saver", "Eco Champion"],
      savings: "Rp 450.000",
      wasteReduced: "15kg",
      co2Saved: "45kg CO2",
    },
    stats: {
      likes: 56,
      comments: 23,
      shares: 12,
      congratulations: 34,
    },
    timestamp: "1 hari lalu",
    tags: ["achievement", "zero-waste", "challenge"],
  },
]

const nearbyUsers = [
  {
    name: "Rina Kusuma",
    avatar: "/placeholder.svg?height=32&width=32",
    distance: "0.8 km",
    commonItems: 12,
    lastActive: "Online",
    specialties: ["Vegetarian", "Baking"],
  },
  {
    name: "Budi Santoso",
    avatar: "/placeholder.svg?height=32&width=32",
    distance: "1.2 km",
    commonItems: 8,
    lastActive: "2 jam lalu",
    specialties: ["Indonesian", "Spicy Food"],
  },
  {
    name: "Maya Sari",
    avatar: "/placeholder.svg?height=32&width=32",
    distance: "1.5 km",
    commonItems: 15,
    lastActive: "Online",
    specialties: ["Healthy", "Meal Prep"],
  },
]

const challenges = [
  {
    id: 1,
    title: "Zero Waste February",
    description: "Challenge untuk tidak membuang makanan selama bulan Februari",
    participants: 1247,
    timeLeft: "18 hari",
    reward: "Eco Warrior Badge + 1000 points",
    difficulty: "Medium",
    joined: false,
  },
  {
    id: 2,
    title: "Recipe Innovation Week",
    description: "Buat resep kreatif dari bahan yang akan expired",
    participants: 856,
    timeLeft: "5 hari",
    reward: "Recipe Master Badge + 500 points",
    difficulty: "Easy",
    joined: true,
  },
  {
    id: 3,
    title: "Community Food Rescue",
    description: "Selamatkan makanan dari tetangga dan bagikan ke yang membutuhkan",
    participants: 432,
    timeLeft: "12 hari",
    reward: "Community Hero Badge + 750 points",
    difficulty: "Hard",
    joined: false,
  },
]

export function SocialFoodSharing() {
  const [newPost, setNewPost] = useState("")
  const [selectedTab, setSelectedTab] = useState("feed")

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "recipe_share":
        return "👨‍🍳"
      case "food_rescue":
        return "🆘"
      case "achievement":
        return "🏆"
      default:
        return "📝"
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "recipe_share":
        return "Recipe Share"
      case "food_rescue":
        return "Food Rescue"
      case "achievement":
        return "Achievement"
      default:
        return "Post"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Social Food Community
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            <Heart className="w-3 h-3 mr-1" />
            Community
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Users</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="rescue">Food Rescue</TabsTrigger>
            <TabsTrigger value="create">Create Post</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Active Users</span>
                </div>
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm opacity-90">+156 this week</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5" />
                  <span className="font-medium">Food Saved</span>
                </div>
                <div className="text-2xl font-bold">1.2 tons</div>
                <div className="text-sm opacity-90">This month</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Recipes Shared</span>
                </div>
                <div className="text-2xl font-bold">3,456</div>
                <div className="text-sm opacity-90">All time</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5" />
                  <span className="font-medium">Items Rescued</span>
                </div>
                <div className="text-2xl font-bold">8,923</div>
                <div className="text-sm opacity-90">This year</div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Post Header */}
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{post.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                Level {post.user.level}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-800 text-xs">{post.user.badge}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{post.user.location}</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getPostTypeIcon(post.type)}</span>
                          <Badge variant="outline" className="text-xs">
                            {getPostTypeLabel(post.type)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{post.content.title}</h3>
                      <p className="text-gray-700 mb-4">{post.content.description}</p>

                      {post.content.image && (
                        <img
                          src={post.content.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}

                      {/* Recipe Details */}
                      {post.type === "recipe_share" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium">Cooking Time</span>
                            </div>
                            <div className="font-semibold text-blue-900">{post.content.cookingTime}</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Star className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium">Difficulty</span>
                            </div>
                            <div className="font-semibold text-green-900">{post.content.difficulty}</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Leaf className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium">Waste Reduced</span>
                            </div>
                            <div className="font-semibold text-purple-900">{post.content.wasteReduced}</div>
                          </div>
                        </div>
                      )}

                      {/* Food Rescue Details */}
                      {post.type === "food_rescue" && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-orange-600" />
                                <span className="font-medium">Pickup Location</span>
                              </div>
                              <div className="text-orange-900">{post.content.location}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="font-medium">Available Until</span>
                              </div>
                              <div className="text-orange-900">{post.content.availableUntil}</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="text-sm font-medium text-orange-700">Items Available:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {post.content.items.map((item, idx) => (
                                <Badge key={idx} className="bg-orange-100 text-orange-800">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-orange-700">
                            Estimated Value: <span className="font-semibold">{post.content.estimatedValue}</span>
                          </div>
                        </div>
                      )}

                      {/* Achievement Details */}
                      {post.type === "achievement" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Gift className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium">Money Saved</span>
                            </div>
                            <div className="font-semibold text-green-900">{post.content.savings}</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Leaf className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium">Waste Reduced</span>
                            </div>
                            <div className="font-semibold text-blue-900">{post.content.wasteReduced}</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Leaf className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium">CO2 Saved</span>
                            </div>
                            <div className="font-semibold text-purple-900">{post.content.co2Saved}</div>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="px-4 py-3 border-t bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.stats.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.stats.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">{post.stats.shares}</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          {post.type === "food_rescue" && (
                            <Button size="sm" className="gap-2">
                              <Gift className="w-3 h-3" />
                              I'm Interested
                            </Button>
                          )}
                          {post.type === "recipe_share" && (
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Star className="w-3 h-3" />
                              Save Recipe
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Nearby Food Enthusiasts</h3>
              <Button variant="outline" className="gap-2 bg-transparent">
                <MapPin className="w-4 h-4" />
                Update Location
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyUsers.map((user, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.distance} away
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${user.lastActive === "Online" ? "bg-green-500" : "bg-gray-400"}`}
                      />
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Common ingredients:</span>
                        <span className="font-medium ml-1">{user.commonItems}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Last active:</span>
                        <span className="font-medium ml-1">{user.lastActive}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {user.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Community Challenges</h3>
              <Badge className="bg-blue-100 text-blue-800">{challenges.filter((c) => c.joined).length} Active</Badge>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className={challenge.joined ? "ring-2 ring-blue-500 bg-blue-50" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{challenge.title}</h3>
                          {challenge.joined && <Badge className="bg-blue-100 text-blue-800">Joined</Badge>}
                        </div>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{challenge.participants.toLocaleString()} participants</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{challenge.timeLeft} left</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-500" />
                            <Badge
                              className={
                                challenge.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800"
                                  : challenge.difficulty === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {challenge.difficulty}
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-purple-900">Reward</span>
                          </div>
                          <div className="text-sm text-purple-800">{challenge.reward}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {challenge.joined ? (
                        <>
                          <Button className="flex-1" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Joined
                          </Button>
                          <Button variant="outline" className="bg-transparent">
                            View Progress
                          </Button>
                        </>
                      ) : (
                        <Button className="flex-1">Join Challenge</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rescue" className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Food Rescue Network</h3>
                  <p className="text-gray-600">Selamatkan makanan dari pemborosan, bagikan kebahagiaan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1,247</div>
                  <div className="text-sm text-gray-600">Items Rescued</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Rp 2.4M</div>
                  <div className="text-sm text-gray-600">Value Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">856</div>
                  <div className="text-sm text-gray-600">Families Helped</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share Food
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Punya makanan berlebih atau akan expired? Bagikan dengan komunitas!</p>
                  <Button className="w-full gap-2">
                    <Camera className="w-4 h-4" />
                    Post Food to Share
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Find Food Near You
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Cari makanan gratis yang dibagikan oleh tetangga di sekitar Anda.</p>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <MapPin className="w-4 h-4" />
                    Browse Available Food
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Food Rescue Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      user: "Sarah W.",
                      action: "shared",
                      item: "Fresh vegetables",
                      time: "2 hours ago",
                      location: "Jakarta Selatan",
                    },
                    {
                      user: "Ahmad F.",
                      action: "rescued",
                      item: "Bread & pastries",
                      time: "4 hours ago",
                      location: "Bandung",
                    },
                    {
                      user: "Lisa P.",
                      action: "shared",
                      item: "Cooked rice",
                      time: "6 hours ago",
                      location: "Surabaya",
                    },
                    { user: "Budi S.", action: "rescued", item: "Fruits", time: "8 hours ago", location: "Yogyakarta" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-gray-600"> {activity.action} </span>
                            <span className="font-medium">{activity.item}</span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <span className="text-2xl">👨‍🍳</span>
                    <span className="text-sm">Share Recipe</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <span className="text-2xl">🆘</span>
                    <span className="text-sm">Food Rescue</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <span className="text-2xl">🏆</span>
                    <span className="text-sm">Share Achievement</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">What's on your mind?</label>
                    <Textarea
                      placeholder="Share your food journey, recipe tips, or help others reduce food waste..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Camera className="w-4 h-4" />
                      Add Photo
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <MapPin className="w-4 h-4" />
                      Add Location
                    </Button>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="bg-transparent">
                      Cancel
                    </Button>
                    <Button className="gap-2">
                      <Send className="w-4 h-4" />
                      Share Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Share authentic recipes and food experiences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Be respectful and supportive to community members</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Only share food that is safe and fresh for rescue posts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>No spam, promotional content, or inappropriate material</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Don't share expired or unsafe food items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
