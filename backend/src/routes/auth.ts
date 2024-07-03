import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { deleteCookie, setCookie } from 'hono/cookie'
import { hashPassword, verifyPassword } from '../utils/crypto'
import { HonoBindings } from '../config/types'
import { COOKIES } from '../config/constants'
import { authMiddleware } from '../middlewares/auth'

export const authRouter = new Hono<HonoBindings>()

authRouter.post('/signup', async (c) => {
  //@ts-ignore
  const prisma = c.get('prisma')
  const body = await c.req.json()
  // hash password
  const hashedPassword = await hashPassword(body.password)
  try {
    const user = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: hashedPassword,
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    setCookie(c, COOKIES.AUTHORIZATION, token, { httpOnly: true, sameSite: c.env.NODE_ENV === 'production' ? 'lax' : 'none', domain: c.env.FRONTEND_URL, secure: true, maxAge: 18000 })
    return c.json({ message: 'User signed up!' })
  } catch (error) {
    return c.json({ message: 'User already exists!' }, 403)
  }
})

authRouter.post('/signin', async (c) => {
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
  setCookie(c, COOKIES.AUTHORIZATION, token, { httpOnly: true, sameSite: c.env.NODE_ENV === 'production' ? 'lax' : 'none', domain: c.env.FRONTEND_URL, secure: true, maxAge: 18000 })
  return c.json({ message: 'User signed in!' })
})

authRouter.post('/signout', async (c) => {
  deleteCookie(c, COOKIES.AUTHORIZATION, {secure: true, sameSite: c.env.NODE_ENV === 'production' ? 'lax' : 'none', domain: c.env.FRONTEND_URL } )
  return c.json({ message: 'User signed out!' })
})

authRouter.use(authMiddleware)
authRouter.get('/me', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId')
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  })
  return c.json(user)
})

