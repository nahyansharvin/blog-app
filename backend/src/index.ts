import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { hashPassword, verifyPassword } from './utils/crypto'
import { user } from './routes/user'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
    prisma: PrismaClient
  }
}>().basePath('/api/v1')

//middleware
app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  //@ts-ignore
  c.set('prisma', prisma)
  await next()
})

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

app.route('/user', user)

app.post('/user/signin', async (c) => {
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

app.post('/blog', (c) => {
  console.log(c.get('userId'));
  return c.json({ message: 'Authenticated route' })
})

app.put('/blog', (c) => {
  return c.json({ message: 'Blog updated!' })
})

app.get('/blog/:id', (c) => {
  return c.json({ message: 'Blog fetched!' })
})

app.get('/blog/bulk', (c) => {
  return c.json({ message: 'Blogs fetched!' })
})

export default app
