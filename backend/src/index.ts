import { Hono } from 'hono'
import { prismaMiddleware } from './middlewares/prisma'
import { authMiddleware } from './middlewares/auth'
import { HonoBindings } from './config/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<HonoBindings>().basePath('/api/v1')

//middlewares
app.use('*', prismaMiddleware )

app.route('/user', userRouter)
app.route('/blog', blogRouter)


export default app