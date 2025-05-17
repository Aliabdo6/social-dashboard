"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChartWrapper } from "@/components/ui/chart"
import { BarChart, LineChart } from "recharts"
import { Bar, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  PenSquare,
  Trash2,
  ImageIcon,
  Calendar,
  TrendingUp,
  Filter,
} from "lucide-react"
import { mockUserPosts } from "@/lib/data"

export function PostsContent() {
  const [posts, setPosts] = useState(mockUserPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost = {
      id: Date.now(),
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      image: null,
      published: true,
      performance: {
        views: [
          { date: "Today", count: 0 },
          { date: "Yesterday", count: 0 },
        ],
      },
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setDialogOpen(false)
  }

  return (
    <Tabs defaultValue="published" className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PenSquare className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>Share your thoughts with your followers</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[150px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost}>Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <TabsContent value="published" className="space-y-4">
        {posts
          .filter((post) => post.published)
          .map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{post.content.substring(0, 60)}...</CardTitle>
                  <CardDescription>{post.timestamp}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PenSquare className="mr-2 h-4 w-4" />
                      Edit Post
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                {post.image && (
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=400"}
                      alt="Post image"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xl font-bold">{post.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xl font-bold">{post.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xl font-bold">{post.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xl font-bold">{post.shares}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardFooter>
            </Card>
          ))}
      </TabsContent>

      <TabsContent value="drafts" className="space-y-4">
        {posts
          .filter((post) => !post.published)
          .map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{post.content.substring(0, 60)}...</CardTitle>
                  <CardDescription>Draft • Last edited {post.timestamp}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PenSquare className="mr-2 h-4 w-4" />
                      Edit Draft
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Publish
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Draft
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                {post.image && (
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=400"}
                      alt="Post image"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Share2 className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </CardFooter>
            </Card>
          ))}

        {posts.filter((post) => !post.published).length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-medium mb-2">No drafts yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start creating content and save it as a draft to publish later
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PenSquare className="mr-2 h-4 w-4" />
                    Create Draft
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create Draft</DialogTitle>
                    <DialogDescription>Save your post as a draft to publish later</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea placeholder="What's on your mind?" className="min-h-[150px]" />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Draft</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Post Performance</CardTitle>
            <CardDescription>Overview of your post engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper content={PostPerformanceChart} className="aspect-[2/1]" title="Post performance" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your posts with the highest engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts
                .filter((post) => post.published)
                .sort((a, b) => b.likes + b.comments + b.shares - (a.likes + a.comments + a.shares))
                .slice(0, 5)
                .map((post, index) => (
                  <div key={post.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{index + 1}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{post.content.substring(0, 60)}...</p>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement by Type</CardTitle>
            <CardDescription>Breakdown of different types of engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper content={EngagementTypeChart} className="aspect-[2/1]" title="Engagement by type" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function PostPerformanceChart() {
  const data = [
    { date: "Jan 1", views: 1000, likes: 200, comments: 50, shares: 25 },
    { date: "Jan 8", views: 1200, likes: 240, comments: 60, shares: 30 },
    { date: "Jan 15", views: 1500, likes: 300, comments: 75, shares: 40 },
    { date: "Jan 22", views: 2000, likes: 400, comments: 100, shares: 50 },
    { date: "Jan 29", views: 2400, likes: 480, comments: 120, shares: 60 },
    { date: "Feb 5", views: 2800, likes: 560, comments: 140, shares: 70 },
    { date: "Feb 12", views: 3200, likes: 640, comments: 160, shares: 80 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
        <Line type="monotone" dataKey="comments" stroke="#ffc658" />
        <Line type="monotone" dataKey="shares" stroke="#ff8042" />
      </LineChart>
    </ResponsiveContainer>
  )
}

function EngagementTypeChart() {
  const data = [
    { name: "Likes", value: 8500 },
    { name: "Comments", value: 3200 },
    { name: "Shares", value: 1500 },
    { name: "Saves", value: 2100 },
    { name: "Profile Visits", value: 4200 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
