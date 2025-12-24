import express from "express"
import authRoutes from './controllers/authController.js'
import cors from "cors"
import authMiddleware from './middleware/authMiddleware.js'
import progressRoutes from './controllers/progressController.js'
import historyRoutes from './controllers/historyController.js'
import personalRoutes from './controllers/personalController.js'
import attemptRoutes from './controllers/attemptsController.js'
import leaderboardRoutes from './controllers/leaderboardController.js'

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
app.use('/leaderboard', authMiddleware, leaderboardRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})

export default app