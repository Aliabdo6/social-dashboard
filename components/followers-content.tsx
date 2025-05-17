"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartWrapper } from "@/components/ui/chart"
import { BarChart, PieChart } from "recharts"
import { Bar, CartesianGrid, Cell, Legend, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Search, UserPlus, UserCheck, Filter } from "lucide-react"
import { mockFollowers, mockAnalyticsData } from "@/lib/data"

export function FollowersContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followers, setFollowers] = useState(mockFollowers)

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollow = (id: number) => {
    setFollowers(
      followers.map((follower) => (follower.id === id ? { ...follower, following: !follower.following } : follower)),
    )
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TabsList>
          <TabsTrigger value="all">All Followers</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search followers..."
              className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFollowers.map((follower) => (
            <Card key={follower.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={follower.avatar || "/placeholder.svg?height=40&width=40"} alt={follower.name} />
                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <CardTitle className="text-base">{follower.name}</CardTitle>
                  <CardDescription>@{follower.username}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="grid gap-1">
                    <div className="text-sm text-muted-foreground">Followers</div>
                    <div className="font-medium">{follower.followerCount}</div>
                  </div>
                  <Button
                    variant={follower.following ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFollow(follower.id)}
                  >
                    {follower.following ? (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Followers</CardTitle>
            <CardDescription>People who started following you in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFollowers
                .filter((f) => f.recentlyFollowed)
                .map((follower) => (
                  <div key={follower.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={follower.avatar || "/placeholder.svg?height=40&width=40"}
                          alt={follower.name}
                        />
                        <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{follower.name}</div>
                        <div className="text-sm text-muted-foreground">@{follower.username}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{follower.followedDate}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="demographics" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
              <CardDescription>Age breakdown of your followers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartWrapper content={AgeDistributionChart} className="aspect-[4/3]" title="Age distribution" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
              <CardDescription>Gender breakdown of your followers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartWrapper content={GenderDistributionChart} className="aspect-[4/3]" title="Gender distribution" />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function AgeDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockAnalyticsData.followerDemographics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" name="Male" fill="#8884d8" />
        <Bar dataKey="female" name="Female" fill="#82ca9d" />
        <Bar dataKey="other" name="Other" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function GenderDistributionChart() {
  const data = [
    { name: "Male", value: 8500 },
    { name: "Female", value: 9200 },
    { name: "Other", value: 1300 },
  ]

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
