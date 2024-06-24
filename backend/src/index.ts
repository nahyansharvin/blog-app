import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { HonoBindings } from './config/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<HonoBindings>().basePath('/api/v1')

//middleware
app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  c.set('prisma', prisma)
  await next()
})

app.use('/blog/*' ,async (c, next) => {
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

app.route('/user', userRouter)
app.route('/blog', blogRouter)


export default app