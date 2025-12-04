import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/name', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
          where: { id: req.userId },
          select: { id: true, username: true }
        })
        res.json(user)

      } catch (err) {
        console.error(err)
        res.sendStatus(500)
      }
    
})

export default router