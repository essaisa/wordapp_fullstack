import express from 'express'
import prisma from '../prismaClient.js'
import { LeaderboardBST } from '../utils/leaderboardBST.js'

const router = express.Router()

// GET leaderboard
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        progresses: {
          orderBy: { day: 'desc' },
          take: 1,
          select: { day: true }
        }
      }
    })

    const leaderboard = users
      .map(u => ({
        username: u.username,
        streak: u.progresses[0]?.day || 0
      }))
      .sort((a, b) => b.streak - a.streak)
      .map((u, i) => ({
        rank: i + 1,
        ...u
      }))

    res.json(leaderboard)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

// SEARCH USER
router.get('/search', async (req, res) => {
  const { username } = req.query

  if (!username) {
    return res.status(400).json({ message: 'Username required' })
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        progresses: {
          orderBy: { day: 'desc' },
          take: 1,
          select: { day: true }
        }
      }
    })

    // BINARY SEARCH TREE
    const bst = new LeaderboardBST()

    users.forEach(u => {
      bst.insert({
        username: u.username,
        streak: u.progresses[0]?.day || 0
      })
    })

    const result = bst.search(username)

    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router
