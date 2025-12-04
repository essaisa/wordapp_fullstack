import express from "express"
import authRoutes from './routes/authRoutes.js'
import cors from "cors"
import authMiddleware from './middleware/authMiddleware.js'
import progressRoutes from './routes/progressRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import personalRoutes from './routes/personalRoutes.js'
import attemptRoutes from './routes/attemptsRoutes.js'

const app = express()
const PORT = process.env.PORT || 5003

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({message: "Yo"})
})

app.use('/auth', authRoutes)
app.use('/progress', authMiddleware, progressRoutes)
app.use('/personal', authMiddleware, personalRoutes)
app.use('/attempts', authMiddleware, attemptRoutes)
app.use('/history', authMiddleware, historyRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})