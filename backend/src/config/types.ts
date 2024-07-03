export type HonoBindings = {
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
        FRONTEND_URL: string
        NODE_ENV: string
    },
    Variables: {
        userId: string
        prisma: any
    }
}