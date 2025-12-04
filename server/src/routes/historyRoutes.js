import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/rec', async (req, res) => {
    
    const { historyRec } =  req.body
    
    try {
        const historyEntry = await prisma.history.create({
            data:{
                userId: req.userId,
                historyRec: historyRec 
            }
        })
        res.json(historyEntry)

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.get('/rec', async (req, res) => {
    try {
        const historyRes = await prisma.history.findFirst({
          where: { userId: req.userId },
          orderBy: { id: 'desc' },
          select: { historyRec: true }
        })
        
        return historyRes ? res.json(historyRes) : res.json({message: "No history yet"})

      } catch (err) {
        console.error(err)
        res.sendStatus(500)
      }
    
})

export default router