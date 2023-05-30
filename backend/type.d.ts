declare module 'process' {
    global {
        var process: NodeJS.Process
        namespace NodeJS {
            interface ProcessEnv {
                PORT: string
                DB_URL: string
                JWT_SECRET_KEY?: string
                JWT_EXPIRES?: string
                ACTIVATION_SECRET?: string

                SMPT_HOST?: string
                SMPT_PORT?: string
                SMPT_PASSWORD?: string
                SMPT_MAIL?: string
                SMPT_SERVICE?: string

                STRIPE_API_KEY?: string
                STRIPE_SECRET_KEY?: string
            }
        }
    }
}
