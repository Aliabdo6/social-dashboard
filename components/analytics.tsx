"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartWrapper } from "@/components/ui/chart"
import { AreaChart, BarChart, LineChart } from "recharts"
import { Area, Bar, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowDown, ArrowUp, Users, Heart, MessageSquare, Share2 } from "lucide-react"
import { mockAnalyticsData } from "@/lib/data"

export function Analytics() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <select className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 12 months</option>
          </select>
        </div>
      </div>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+12%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+8%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,765</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">-3%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shares</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,456</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+18%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Engagement metrics over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartWrapper content={EngagementChart} className="aspect-[2/1]" title="Engagement metrics" />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>New followers over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartWrapper content={FollowerGrowthChart} className="aspect-[3/2]" title="Follower growth" />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="engagement" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Detailed breakdown of engagement across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper content={PlatformEngagementChart} className="aspect-[2/1]" title="Platform engagement" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="followers" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Follower Demographics</CardTitle>
            <CardDescription>Breakdown of your audience by age, location and interests</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper content={FollowerDemographicsChart} className="aspect-[2/1]" title="Follower demographics" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockAnalyticsData.engagementOverview}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
        <Line type="monotone" dataKey="shares" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

function FollowerGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={mockAnalyticsData.followerGrowth}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="followers" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function PlatformEngagementChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockAnalyticsData.platformEngagement}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="platform" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="likes" fill="#8884d8" />
        <Bar dataKey="comments" fill="#82ca9d" />
        <Bar dataKey="shares" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function FollowerDemographicsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockAnalyticsData.followerDemographics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" fill="#8884d8" />
        <Bar dataKey="female" fill="#82ca9d" />
        <Bar dataKey="other" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}
