import express from "express"
import authRoutes from './routes/authRoutes.js'
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5003

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({message: "Yo"})
})

app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})