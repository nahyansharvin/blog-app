import { createMiddleware } from "hono/factory"
import { verify } from 'hono/jwt'


export const authMiddleware = createMiddleware(async (c, next) => {
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