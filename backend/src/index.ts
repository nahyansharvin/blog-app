import { Hono } from 'hono'
import { prismaMiddleware } from './middlewares/prisma'
import { authMiddleware } from './middlewares/auth'
import { HonoBindings } from './config/types'
import { authRouter } from './routes/auth'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<HonoBindings>().basePath('/api/v1')

//middlewares
app.use('*', prismaMiddleware )
app.use(cors({origin(origin, c) {
    if (origin.endsWith("nahyan-sharvins-projects.vercel.app")) return origin
    return c.env.FRONTEND_URL
}, credentials: true}))

app.route('/auth', authRouter)
app.route('/blog', blogRouter)


export default app