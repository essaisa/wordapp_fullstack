import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/day', async (req, res) => {
    console.log(req.userId)
    const { day, datetime } =  req.body
    try {
        const progress = await prisma.progress.create({
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

router.get('/day', async (req, res) => {
    try {
      const progress = await prisma.progress.findFirst({
        where: { userId: req.userId },
        orderBy: { datetime: 'desc' },
        select: { day: true, datetime: true }
      });
  
      if (!progress) {
        return res.json({ day: 1, datetime: null });
      }
  
      // convert BigInt to string for safe JSON serialization
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