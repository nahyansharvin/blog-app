import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CreateBlog2() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create a New Blog Post</h1>
            <p className="mt-3 text-lg text-muted-foreground">Share your thoughts and ideas with the world.</p>
          </div>
          <form className="space-y-6">
            <div>
              <Label htmlFor="title" className="block text-sm font-medium">
                Title
              </Label>
              <Input id="title" type="text" placeholder="Enter a catchy title" className="mt-1 block w-full" />
            </div>
            <div>
              <Label htmlFor="content" className="block text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                rows={8}
                placeholder="Write your blog post content here..."
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="thumbnail" className="block text-sm font-medium">
                Thumbnail
              </Label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-muted px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                    >
                      <span>Upload a file</span>
                      <Input id="thumbnail" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Publish
              </Button>
            </div>
          </form>
        </div>
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
