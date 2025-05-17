"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Filter, TrendingUp } from "lucide-react"
import { mockFeed } from "@/lib/data"

export function FeedContent() {
  const [feed, setFeed] = useState(mockFeed)

  const handleLike = (id: number) => {
    setFeed(
      feed.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const handleBookmark = (id: number) => {
    setFeed(
      feed.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input placeholder="What's on your mind?" className="mb-2" />
                  <div className="flex justify-end">
                    <Button>Post</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="all" className="space-y-4">
          {feed.map((post) => (
            <FeedPost key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} />
          ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          {feed
            .filter((post) => post.author.following)
            .map((post) => (
              <FeedPost key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} />
            ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="mb-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["#TechNews", "#Marketing", "#SocialMediaTips", "#DigitalStrategy", "#ContentCreation"].map(
                    (tag) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="font-medium text-primary">{tag}</span>
                        <span className="text-sm text-muted-foreground">1.2K posts</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {feed
            .filter((post) => post.trending)
            .map((post) => (
              <FeedPost key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FeedPost({ post, onLike, onBookmark }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarImage src={post.author.avatar || "/placeholder.svg?height=40&width=40"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle className="text-base">{post.author.name}</CardTitle>
          <CardDescription>{post.timestamp}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Hide post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
            <DropdownMenuItem>Follow {post.author.name}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={post.image || "/placeholder.svg?height=400&width=600"}
              alt="Post image"
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-primary font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${post.liked ? "text-red-500" : ""}`}
            onClick={() => onLike(post.id)}
          >
            <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={post.bookmarked ? "text-primary" : ""}
          onClick={() => onBookmark(post.id)}
        >
          <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
          <span className="sr-only">Bookmark</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
