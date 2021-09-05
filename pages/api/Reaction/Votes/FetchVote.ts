import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function FetchVote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  const { id } = req.query
  if (!id) {
    return res.status(400).json({
      message: "Missing parameter",
    })
  }

  try {
    const votes = await prisma.vote.findMany({
      where: {
        articleId: Number(id) || -1,
      },
      select: {
        level: true,
        userId: true,
      },
    })

    let result = {
      total: 0,
      average: 0,
      voted: 0,
    }
    if (votes) {
      // calc sum of all levels
      let sum = votes.reduce((acc, curr) => acc + curr.level, 0)
      // total
      result.total = votes.length
      // avange of level
      result.average = Math.round((sum / votes.length) * 10) / 10

      if (session) {
        // find user was voted or not
        const found = votes.find((e) => e.userId == session.id)
        result.voted = found.level
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      message: "Unexpected error occurred.",
      error: error,
    })
  }
}
