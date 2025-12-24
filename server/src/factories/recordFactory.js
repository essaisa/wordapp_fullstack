import prisma from "../prismaClient.js"

export async function createRecord(type, data) {
  switch (type) {
    case "user":
      return prisma.user.create({ data })

    case "progress":
      return prisma.progress.create({ data })

    case "attempt":
      return prisma.attempts.create({ data })

    case "history":
      return prisma.history.create({ data })

    default:
      throw new Error(`Unknown record type: ${type}`)
  }
}
