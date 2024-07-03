import { Button } from "@/components/ui/button"
import { handleApiError } from "@/lib/handleApiError"
import { SingleBlogResponse } from "@/lib/types"
import { getBlog } from "@/services/BlogService"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function BlogView() {
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [blog, setBlog] = useState<SingleBlogResponse | null>(null)

    const fetchBlog = async () => {
        try {
            const response = await getBlog(id)
            document.title = response.blog.title
            setBlog(response)
        } catch (error) {
            handleApiError(error)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    return (
        <div className="px-4 py-6 md:px-6 md:py-12 lg:py-15">
            <article className="prose prose-gray max-w-4xl mx-auto dark:prose-invert relative">
                {/* Back Button */}
                <Button variant="link" className="absolute -top-11 -left-4" onClick={() => navigate("/")}>Back</Button>
                <div className="space-y-4 not-prose">
                    <h1 className="text-4xl font-extrabold font-heading tracking-tight lg:text-5xl">
                        {blog?.blog.title}
                    </h1>
                    <div className="mb-10 flex items-center gap-3">
                        <div className="grid">
                            <div className="text-lg font-medium">{blog?.blog.author.name}</div>
                            <p className="text-muted-foreground text-sm">{blog?.blog.author.email}</p>
                        </div>
                    </div>
                </div>
                <img
                    src={blog?.blog.thumbnail ? blog.blog.thumbnail : "/placeholder.svg"}
                    alt="Blog Thumbnail"
                    width={1200}
                    height={600}
                    className="aspect-[2/1] overflow-hidden rounded-lg object-cover my-4"
                />
                <p>
                    {blog?.blog.content}
                </p>
            </article>
        </div>
    )
}
