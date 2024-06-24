import { Hono } from 'hono'
import { HonoBindings } from '../config/types'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'

export const blogRouter = new Hono<HonoBindings>()

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

    console.log("id", id);

    try {
        const post = await prisma.post.findUnique({
            where: { id: id }
        })
        return c.json({ blog: post })
    } catch (error) {
        return c.json({ message: 'Blog not found!' }, 404)
    }
})

blogRouter.get('/bulk', async (c) => {
    //@ts-ignore
    // const prisma = c.get('prisma')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("ivdethi");
    

    try {
        const posts = await prisma.post.findMany({})
        return c.json({ blogs: posts })
    } catch (error) {
        return c.json({ message: 'Blogs not found!' }, 404)
    }
})