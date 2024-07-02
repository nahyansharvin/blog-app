import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CreateBlog() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Create a new blog post</h1>
          <p className="text-muted-foreground">Share your thoughts and ideas with the world.</p>
        </div>
        <form className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a title for your blog post" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Write the content of your blog post" className="mt-1 h-40" />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input id="thumbnail" type="file" accept="image/*" className="flex-1" />
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Publish Blog Post
          </Button>
        </form>
      </div>
    </div>
  )
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
