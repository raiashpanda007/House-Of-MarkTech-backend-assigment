import express from 'express'
import { config as _config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoutes from './routes/auth.routes'
import TasksRoutes from './routes/tasks.routes'
import verifyMiddleware from './middlewares/verify.middleware'
class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.intializeMiddleware()
        this.intializeRoutes()
        
    }
    intializeMiddleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        
    }
    intializeRoutes() {
        this.app.use('/api/auth', AuthRoutes)
        this.app.use('/api/tasks',verifyMiddleware ,TasksRoutes)
        
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
        
    }
}


const app = new App()
app.listen()