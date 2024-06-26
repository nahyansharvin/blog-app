import { Hono } from 'hono'
import { HonoBindings } from '../config/types'
import { authMiddleware } from '../middlewares/auth'

export const blogRouter = new Hono<HonoBindings>()

blogRouter.get('/bulk', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')    

    try {
        const posts = await prisma.post.findMany()
        return c.json({ blogs: posts })
    } catch (error) {
        return c.json({ message: 'Blogs not found!' }, 404)
    }
})

// middlewares
blogRouter.use('*' , authMiddleware )

blogRouter.post('/', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')
    const body = await c.req.json()
    const userId = c.get('userId')
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                thumbnail: body.thumbnail
            }
        })
        return c.json({ message: 'Blog created!', id: post.id })
    } catch (error) {
        return c.json({ message: 'Blog not created!' }, 403)
    }
})

blogRouter.put('/', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')
    const body = await c.req.json()
    const userId = c.get('userId')
    try {
        const post = await prisma.post.update({
            where: { 
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content,
                thumbnail: body.thumbnail
            }
        })
        return c.json({ message: 'Blog updated!', id: post.id})
    } catch (error) {
        return c.json({ message: 'Blog not updated!' }, 403)
    }
})

blogRouter.get('/:id', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')
    const id = c.req.param('id')

    try {
        const post = await prisma.post.findUnique({
            where: { id: id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })
        return c.json({ blog: post })
    } catch (error) {
        return c.json({ message: 'Blog not found!', error }, 404)
    }
})