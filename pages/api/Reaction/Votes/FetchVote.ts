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

    // calc sum of all levels
    let sum = votes.reduce((acc, curr) => acc + curr.level, 0)
    // total
    const total = votes.length
    // avange of level
    const average = Math.round((sum / total) * 10) / 10 || 0

    // find user was voted or not
    const voted = session
      ? votes.find((e) => e.userId == session?.id)?.level
      : false

    return res.status(200).json({
      total: total,
      average: average,
      voted: voted,
    })
  } catch (error) {
    return res.status(400).json({
      message: "Unexpected error occurred.",
      error: error,
    })
  }
}
