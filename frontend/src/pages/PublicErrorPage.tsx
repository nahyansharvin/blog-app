export function PublicErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] bg-background">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Login to read this!</h1>
                <p className="text-muted-foreground">
                    You have to login to read this blog. If you don't have an account, you can create one for free.
                </p>
                <a
                    href="/signup"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Create an account
                </a>
            </div>
        </div>
    )
}
