//IMPORTS
import express from 'express'
import prisma from '../prismaClient.js'
import { createRecord } from "../factories/recordFactory.js"

const router = express.Router()

// HISTORY POST ROUTE
router.post('/rec', async (req, res) => {
    
    const { historyRec } =  req.body
    
    try {
        const historyEntry = await createRecord("history", {
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

// HISTORY GET ROUTE
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