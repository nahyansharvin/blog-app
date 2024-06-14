import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../utils/crypto'

export const user = new Hono()

user.post('/user/signup', async (c) => {
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
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

