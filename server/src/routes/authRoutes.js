import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    
    if (username.length < 2 || username.length > 16) return res.status(400).json({message: "Username length invalid"})
    if (password.length < 8) return res.status(400).json({message: "Password must length of 8 characters or more"})

    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (userExists) return res.status(400).json({message: "Username is already taken"})

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router

