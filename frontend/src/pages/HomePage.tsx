import { handleApiError } from "@/lib/handleApiError"
import { Blog } from "@/lib/types"
import { getAllBlogs } from "@/services/BlogService"
import { Card, CardContent } from "Components/ui/card"
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "Components/ui/pagination"
import { useEffect, useState } from "react"

export function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs()
      setBlogs(response.blogs)
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 py-8 px-6 md:px-8 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Card key={index} className="shadow-md">
            <img
              src={blog.thumbnail ? blog.thumbnail : "/placeholder.svg"}
              alt="Blog Post"
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {blog.content.substring(0, 140) + "..."}
              </p>
              <a
                href={`/blog/${blog.id}`}
                className="inline-flex items-center text-primary hover:text-blue-800"
              >
                Read More
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div className="container mx-auto mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </div>
  )
}

function ArrowRightIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}