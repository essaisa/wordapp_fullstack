// IMPORTS
import express from 'express'
import prisma from '../prismaClient.js'
import { LinkedList } from '../utils/linkedList.js';
import { createRecord } from "../factories/recordFactory.js"

const router = express.Router()


// POST METHOD -- ATTEMPTS
router.post('/rec', async (req, res) => {
    const { attempts } = req.body; 
  
    // LINKED LIST
    const attemptsList = new LinkedList();
    attemptsList.append(attempts);
  
    try {
      // FACTORY
      const attemptsRec = await createRecord("attempt", {
        data: {
          userId: req.userId,
          attemptNo: attemptsList.head.value, 
        }
      });
      res.json(attemptsRec);
  
    } catch (err) {
      console.log(err.message);
      res.sendStatus(503);
    }
  });

// GET METHOD
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