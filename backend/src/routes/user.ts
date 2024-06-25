import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../utils/crypto'
import { HonoBindings } from '../config/types'

export const userRouter = new Hono<HonoBindings>()

userRouter.post('/signup', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')
    const body = await c.req.json()
    // hash password
    const hashedPassword = await hashPassword(body.password)
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
        }
      })
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ message: 'User signed up!', token })
    } catch (error) {
      return c.json({ message: 'User already exists!' }, 403)
    }
})

userRouter.post('/signin', async (c) => {
    //@ts-ignore
    const prisma = c.get('prisma')
    const body = await c.req.json()
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    })
    if (!user) {
      return c.json({ message: 'User not found!' }, 403)
    }
    const passwordMatch = await verifyPassword(user.password, body.password)
    if (!passwordMatch) {
      return c.json({ message: 'Invalid password!' }, 403)
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ message: 'User signed in!', token })
  })

