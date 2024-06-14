import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { hashPassword, verifyPassword } from './utils/crypto'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
    prisma: PrismaClient
  }
}>()

//middleware
app.use('/api/v1/blog/*' ,async (c, next) => {
  const jwt = c.req.header('Authorization')
  if (!jwt) {
    return c.json({ error: 'Unauthorised' }, 401)
  }
  const token = jwt.split(' ')[1]
  try {
    const decoded = await verify(token, c.env.JWT_SECRET)
    //@ts-ignore
    c.set('userId', decoded.id)
  } catch (error) {
    return c.json({ message: 'Invalid token!' }, 403)
  }
  await next()
})

app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  //@ts-ignore
  c.set('prisma', prisma)
  await next()
})

app.post('/api/v1/user/signup', async (c) => {
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

app.post('/api/v1/user/signin', async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate())
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

app.post('/api/v1/blog', (c) => {
  console.log(c.get('userId'));
  return c.json({ message: 'Authenticated route' })
})

app.put('/api/v1/blog', (c) => {
  return c.json({ message: 'Blog updated!' })
})

app.get('/api/v1/blog/:id', (c) => {
  return c.json({ message: 'Blog fetched!' })
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.json({ message: 'Blogs fetched!' })
})

export default app
