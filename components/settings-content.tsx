"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Lock, Palette, Upload, Shield } from "lucide-react"
import { useForm } from "react-hook-form"

export function SettingsContent() {
  return (
    <Tabs defaultValue="account" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="account">
          <User className="mr-2 h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="privacy">
          <Lock className="mr-2 h-4 w-4" />
          Privacy
        </TabsTrigger>
        <TabsTrigger value="appearance">
          <Palette className="mr-2 h-4 w-4" />
          Appearance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="space-y-4">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="privacy" className="space-y-4">
        <PrivacySettings />
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <AppearanceSettings />
      </TabsContent>
    </Tabs>
  )
}

function AccountSettings() {
  const form = useForm({
    defaultValues: {
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "Product designer and developer based in New York",
      website: "https://johndoe.com",
    },
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information and how others see you on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Change Avatar
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Your full name as it appears on your profile</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Your unique username (@username)</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormDescription>Your email address for notifications and account recovery</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>A brief description about yourself (max 160 characters)</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Your personal or business website</FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Account Type</h4>
              <p className="text-sm text-muted-foreground">Your current account type and features</p>
            </div>
            <div>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                Personal
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Language</h4>
              <p className="text-sm text-muted-foreground">Choose your preferred language</p>
            </div>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newFollower: true,
    mentions: true,
    comments: true,
    directMessages: true,
    postLikes: false,
    newsletter: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newFollower: true,
    mentions: true,
    comments: true,
    directMessages: true,
    postLikes: true,
    trending: false,
  })

  const updateEmailSetting = (key, value) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: value,
    })
  }

  const updatePushSetting = (key, value) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: value,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage the emails you receive from us</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">New Followers</div>
              <div className="text-sm text-muted-foreground">Receive an email when someone follows you</div>
            </div>
            <Switch
              checked={emailNotifications.newFollower}
              onCheckedChange={(value) => updateEmailSetting("newFollower", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Mentions</div>
              <div className="text-sm text-muted-foreground">Receive an email when someone mentions you</div>
            </div>
            <Switch
              checked={emailNotifications.mentions}
              onCheckedChange={(value) => updateEmailSetting("mentions", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Comments</div>
              <div className="text-sm text-muted-foreground">Receive an email when someone comments on your post</div>
            </div>
            <Switch
              checked={emailNotifications.comments}
              onCheckedChange={(value) => updateEmailSetting("comments", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Direct Messages</div>
              <div className="text-sm text-muted-foreground">Receive an email when someone sends you a message</div>
            </div>
            <Switch
              checked={emailNotifications.directMessages}
              onCheckedChange={(value) => updateEmailSetting("directMessages", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Post Likes</div>
              <div className="text-sm text-muted-foreground">Receive an email when someone likes your post</div>
            </div>
            <Switch
              checked={emailNotifications.postLikes}
              onCheckedChange={(value) => updateEmailSetting("postLikes", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Newsletter</div>
              <div className="text-sm text-muted-foreground">Receive our weekly newsletter with platform updates</div>
            </div>
            <Switch
              checked={emailNotifications.newsletter}
              onCheckedChange={(value) => updateEmailSetting("newsletter", value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Email Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Manage the push notifications you receive on your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">New Followers</div>
              <div className="text-sm text-muted-foreground">Receive a notification when someone follows you</div>
            </div>
            <Switch
              checked={pushNotifications.newFollower}
              onCheckedChange={(value) => updatePushSetting("newFollower", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Mentions</div>
              <div className="text-sm text-muted-foreground">Receive a notification when someone mentions you</div>
            </div>
            <Switch
              checked={pushNotifications.mentions}
              onCheckedChange={(value) => updatePushSetting("mentions", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Comments</div>
              <div className="text-sm text-muted-foreground">
                Receive a notification when someone comments on your post
              </div>
            </div>
            <Switch
              checked={pushNotifications.comments}
              onCheckedChange={(value) => updatePushSetting("comments", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Direct Messages</div>
              <div className="text-sm text-muted-foreground">
                Receive a notification when someone sends you a message
              </div>
            </div>
            <Switch
              checked={pushNotifications.directMessages}
              onCheckedChange={(value) => updatePushSetting("directMessages", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Post Likes</div>
              <div className="text-sm text-muted-foreground">Receive a notification when someone likes your post</div>
            </div>
            <Switch
              checked={pushNotifications.postLikes}
              onCheckedChange={(value) => updatePushSetting("postLikes", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Trending Topics</div>
              <div className="text-sm text-muted-foreground">Receive notifications about trending topics</div>
            </div>
            <Switch
              checked={pushNotifications.trending}
              onCheckedChange={(value) => updatePushSetting("trending", value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Push Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    showActivity: true,
    allowTagging: true,
    allowMentions: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
  })

  const updatePrivacySetting = (key, value) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control who can see your content and interact with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Private Account</div>
              <div className="text-sm text-muted-foreground">
                Only approved followers can see your posts and stories
              </div>
            </div>
            <Switch
              checked={privacySettings.privateAccount}
              onCheckedChange={(value) => updatePrivacySetting("privateAccount", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Activity Status</div>
              <div className="text-sm text-muted-foreground">Show when you were last active on the platform</div>
            </div>
            <Switch
              checked={privacySettings.showActivity}
              onCheckedChange={(value) => updatePrivacySetting("showActivity", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Tagging</div>
              <div className="text-sm text-muted-foreground">Allow others to tag you in their posts and photos</div>
            </div>
            <Switch
              checked={privacySettings.allowTagging}
              onCheckedChange={(value) => updatePrivacySetting("allowTagging", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Mentions</div>
              <div className="text-sm text-muted-foreground">
                Allow others to mention you in their posts and comments
              </div>
            </div>
            <Switch
              checked={privacySettings.allowMentions}
              onCheckedChange={(value) => updatePrivacySetting("allowMentions", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Online Status</div>
              <div className="text-sm text-muted-foreground">Show when you're currently active on the platform</div>
            </div>
            <Switch
              checked={privacySettings.showOnlineStatus}
              onCheckedChange={(value) => updatePrivacySetting("showOnlineStatus", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Direct Messages</div>
              <div className="text-sm text-muted-foreground">Allow others to send you direct messages</div>
            </div>
            <Switch
              checked={privacySettings.allowDirectMessages}
              onCheckedChange={(value) => updatePrivacySetting("allowDirectMessages", value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Privacy Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data and Security</CardTitle>
          <CardDescription>Manage your data and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Enable
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Data Download</div>
              <div className="text-sm text-muted-foreground">Download a copy of your data</div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Request
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Blocked Accounts</div>
              <div className="text-sm text-muted-foreground">Manage accounts you've blocked</div>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState("system")
  const [fontSize, setFontSize] = useState("medium")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the appearance of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Choose between light, dark, or system theme</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Reduced Motion</div>
              <div className="text-sm text-muted-foreground">Reduce the amount of animations and transitions</div>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">High Contrast</div>
              <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Appearance Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Customization</CardTitle>
          <CardDescription>Customize the colors used in the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary" />
                <Select defaultValue="default">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent" />
                <Select defaultValue="default">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Color Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function Label({ children }) {
  return (
    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </div>
  )
}

function Download({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
