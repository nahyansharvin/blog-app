import { Hono } from 'hono'
import { prismaMiddleware } from './middlewares/prisma'
import { authMiddleware } from './middlewares/auth'
import { HonoBindings } from './config/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<HonoBindings>().basePath('/api/v1')

//middlewares
app.use('*', prismaMiddleware )
app.use('*', cors())

app.route('/user', userRouter)
app.route('/blog', blogRouter)


export default app