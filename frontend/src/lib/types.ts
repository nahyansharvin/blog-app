export type Blog = {
    id: string
    title: string
    content: string
    thumbnail: string
    published: boolean
    authorId: string
}

export type SingleBlogResponse = {
    blog: Blog & {
        author: {
            id: string
            name: string
            email: string
        }
    }
}

export type BulkBlogResponse = {
    blogs: Blog[]
}

export type WriteBlogRequest = {
    title: string
    content: string
    thumbnail: string
}
