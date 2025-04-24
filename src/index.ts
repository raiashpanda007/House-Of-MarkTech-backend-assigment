import express from 'express'
import { config as _config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

class App {
    public app: express.Application

    constructor() {
        this.app = express()
    }
    intializeMiddleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
        
    }
}


const app = new App()
app.listen()