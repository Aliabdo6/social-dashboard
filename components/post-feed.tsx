"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react"
import { mockPosts } from "@/lib/data"

export function PostFeed() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
        <Button variant="outline">New Post</Button>
      </div>
      <div className="grid gap-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle className="text-base">{post.author.name}</CardTitle>
          <CardDescription>{post.timestamp}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto rounded-full">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="overflow-hidden rounded-lg">
            <img src={post.image || "/placeholder.svg"} alt="Post image" className="aspect-video w-full object-cover" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
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
        <Button variant="ghost" size="sm" className={bookmarked ? "text-primary" : ""} onClick={handleBookmark}>
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          <span className="sr-only">Bookmark</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
