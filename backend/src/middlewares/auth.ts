import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import { verify } from 'hono/jwt'
import { COOKIES } from "../config/constants"


export const authMiddleware = createMiddleware(async (c, next) => {
    const token = getCookie(c, COOKIES.AUTHORIZATION)
    if (!token) {
        return c.json({ error: 'Unauthorised' }, 401)
    }
    try {
        const decoded = await verify(token, c.env.JWT_SECRET)
        //@ts-ignore
        c.set('userId', decoded.id)
    } catch (error) {
        return c.json({ message: 'Invalid token!' }, 403)
    }
    await next()
})