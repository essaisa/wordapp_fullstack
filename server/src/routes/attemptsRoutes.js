import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/rec', async (req, res) => {
    
    const { attempts } =  req.body
    
    try {
        const attemptsRec = await prisma.attempts.create({
            data:{
                userId: req.userId,
                attemptNo: attempts,
            }
        })
        res.json(attemptsRec)
        

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.get('/rec', async (req, res) => {
    try {
        const attemptsRec = await prisma.attempts.findFirst({
          where: { userId: req.userId },
          orderBy: { id: 'desc' },
          select: { attemptNo: true }
        })
        res.json(attemptsRec)

      } catch (err) {
        console.error(err)
        res.sendStatus(500)
      }
    
})

export default router