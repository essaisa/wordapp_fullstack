// IMPORTS
import express from 'express'
import prisma from '../prismaClient.js'
import { createRecord } from "../factories/recordFactory.js"

const router = express.Router()

// POST PROGRESS 
router.post('/day', async (req, res) => {
    const { day, datetime } =  req.body
    // EXCEPTION HANDLING
    try {
      // FACTORY
        const progress = await createRecord("progress", {
            data:{
                userId: req.userId,
                day: day,
                datetime: BigInt(datetime)
            }
        })
        res.json({
            ...progress,
            datetime: progress.datetime.toString(),
          });

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)

    }
})

// GET PROGRESS
router.get('/day', async (req, res) => {
  // EXCEPTION HANDLING
    try {
      const progress = await prisma.progress.findFirst({
        where: { userId: req.userId },
        orderBy: { datetime: 'desc' },
        select: { day: true, datetime: true }
      });
  
      // EDGE CASE
      if (!progress) {
        return res.json({ day: 1, datetime: null });
      }
  
      res.json({
        day: progress.day,
        datetime: progress.datetime.toString()
      });
  
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

export default router