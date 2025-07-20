"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Gift, Users, Award, Crown, Flame } from "lucide-react"

const userStats = {
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  streak: 15,
  totalPoints: 12450,
  rank: "Eco Warrior",
  achievements: 23,
}

const achievements = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Tidak ada limbah makanan selama 7 hari berturut-turut",
    icon: "🌱",
    unlocked: true,
    rarity: "rare",
    points: 500,
    unlockedDate: "2025-01-10",
  },
  {
    id: 2,
    title: "Recipe Master",
    description: "Coba 50 resep berbeda dari AI suggestions",
    icon: "👨‍🍳",
    unlocked: true,
    rarity: "epic",
    points: 750,
    unlockedDate: "2025-01-08",
  },
  {
    id: 3,
    title: "Inventory Guru",
    description: "Kelola 100+ item dalam inventaris",
    icon: "📦",
    unlocked: false,
    rarity: "common",
    points: 200,
    progress: 87,
  },
  {
    id: 4,
    title: "Social Saver",
    description: "Ajak 10 teman bergabung dengan Smart Pantry",
    icon: "🤝",
    unlocked: false,
    rarity: "legendary",
    points: 1000,
    progress: 3,
  },
]

const challenges = [
  {
    id: 1,
    title: "Weekly Zero Waste",
    description: "Tidak ada limbah makanan selama minggu ini",
    type: "weekly",
    progress: 5,
    target: 7,
    reward: 300,
    timeLeft: "2 hari",
    difficulty: "medium",
  },
  {
    id: 2,
    title: "Recipe Explorer",
    description: "Coba 5 resep baru minggu ini",
    type: "weekly",
    progress: 2,
    target: 5,
    reward: 200,
    timeLeft: "2 hari",
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Perfect Prediction",
    description: "Prediksi expiry date dengan akurasi 95%",
    type: "monthly",
    progress: 92,
    target: 95,
    reward: 500,
    timeLeft: "18 hari",
    difficulty: "hard",
  },
]

const leaderboard = [
  { rank: 1, name: "Sarah W.", points: 15420, level: 15, badge: "👑" },
  { rank: 2, name: "Ahmad F.", points: 14230, level: 14, badge: "🥈" },
  { rank: 3, name: "Lisa P.", points: 13890, level: 13, badge: "🥉" },
  { rank: 4, name: "You", points: 12450, level: 12, badge: "⭐" },
  { rank: 5, name: "Budi S.", points: 11200, level: 11, badge: "" },
]

const rewards = [
  {
    id: 1,
    title: "Premium Recipe Pack",
    description: "Akses 100+ resep premium dari chef terkenal",
    cost: 2000,
    type: "digital",
    available: true,
  },
  {
    id: 2,
    title: "Smart Kitchen Timer",
    description: "Timer digital dengan notifikasi smart",
    cost: 5000,
    type: "physical",
    available: true,
  },
  {
    id: 3,
    title: "Eco-Friendly Container Set",
    description: "Set 5 container ramah lingkungan",
    cost: 8000,
    type: "physical",
    available: false,
  },
]

export function Gamification() {
  const [activeTab, setActiveTab] = useState("overview")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Gamification Hub
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Level {userStats.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-8 h-8" />
                    <div>
                      <div className="text-2xl font-bold">Level {userStats.level}</div>
                      <div className="text-sm opacity-90">{userStats.rank}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total Points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Flame className="w-8 h-8" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.streak}</div>
                      <div className="text-sm opacity-90">Day Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.achievements}</div>
                      <div className="text-sm opacity-90">Achievements</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* XP Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Progress to Level {userStats.level + 1}</h3>
                    <p className="text-sm text-gray-600">
                      {userStats.xp} / {userStats.xpToNext} XP
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{userStats.xpToNext - userStats.xp} XP to go</Badge>
                </div>
                <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-3" />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Completed Zero Waste Day", points: "+50 XP", time: "2 hours ago", icon: "🌱" },
                    { action: "Tried new recipe: Sup Tomat", points: "+25 XP", time: "5 hours ago", icon: "👨‍🍳" },
                    { action: "Perfect inventory prediction", points: "+30 XP", time: "1 day ago", icon: "🎯" },
                    { action: "Shared recipe with friend", points: "+15 XP", time: "2 days ago", icon: "🤝" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.time}</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{activity.points}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${getRarityColor(achievement.rarity)} ${achievement.unlocked ? "" : "opacity-75"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                          {achievement.unlocked && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Unlocked</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                        {achievement.unlocked ? (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-600">
                              +{achievement.points} points earned
                            </span>
                            <span className="text-xs text-gray-500">{achievement.unlockedDate}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                            <div className="text-xs text-gray-500">Reward: {achievement.points} points</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                          <Badge variant="outline">{challenge.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">+{challenge.reward} XP</div>
                        <div className="text-sm text-gray-500">{challenge.timeLeft} left</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.target) * 100} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.name === "You" ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {user.badge && <span className="text-lg">{user.badge}</span>}
                            {user.name === "You" && <Badge className="bg-blue-100 text-blue-800">You</Badge>}
                          </div>
                          <div className="text-sm text-gray-600">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Your Points Balance</span>
              </div>
              <div className="text-2xl font-bold text-orange-900">{userStats.totalPoints.toLocaleString()} points</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className={!reward.available ? "opacity-50" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold mb-2">{reward.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {reward.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{reward.cost.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>

                    <Button className="w-full" disabled={!reward.available || userStats.totalPoints < reward.cost}>
                      {!reward.available
                        ? "Coming Soon"
                        : userStats.totalPoints < reward.cost
                          ? "Not Enough Points"
                          : "Redeem"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
