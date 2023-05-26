declare module 'process' {
    global {
        var process: NodeJS.Process
        namespace NodeJS {
            interface ProcessEnv extends Dict<string> {
                PORT: string
                DB_URL: string
            }
        }
    }
}
