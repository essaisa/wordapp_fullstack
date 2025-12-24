// IMPORTS
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { createRecord } from "../factories/recordFactory.js"


const router = express.Router()

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    
    // EDGE CASES
    if (username.length < 2 || username.length > 16) return res.status(400).json({message: "Username length invalid"})
    if (password.length < 8) return res.status(400).json({message: "Password must length of 8 characters or more"})

    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (userExists) return res.status(400).json({message: "Username is already taken"})

    // EXCEPTION HANDLING
    try {
        // FACTORY
        const user = await createRecord("user", {
            username,
            password: hashedPassword
          })          

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

// LOGIN ROUTE
router.post('/login', async (req, res) => {

    const { username, password } = req.body

    // EXCEPTION HANDLING
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })


        // EDGE CASES
        if (!user) { return res.status(400).send({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) { return res.status(400).send({ message: "Invalid password" }) }
        console.log(user)

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

// EDIT ACCOUNT
router.put('/edit', authMiddleware, async (req, res) => {
        const { username } = req.body
    
        if (!username) {
        return res.status(400).json({ message: 'Username is required' })
        }
    
        try {
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { username }
        })
    
        res.json({
            message: 'Account updated successfully',
            username: updatedUser.username
        })
        } catch (err) {
        
        if (err.code === 'P2002') {
            return res.status(409).json({ message: 'Username already taken' })
        }
    
        console.error(err)
        res.sendStatus(500)
        }
    })

    // DELETE ACCOUNT
    router.delete('/delete', authMiddleware, async (req, res) => {
        try {
          await prisma.user.delete({
            where: { id: req.userId }
          })
      
          return res.json({ message: 'Account deleted successfully' })
        } catch (err) {
          console.error(err)
          return res.status(500).json({ message: 'Failed to delete account' })
        }
      })
      

export default router

