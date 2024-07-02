export type HonoBindings = {
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
        prisma: any
    }
}