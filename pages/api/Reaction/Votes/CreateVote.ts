import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"
import { auth } from "../../../../lib/auth"

export default async function CreateVote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res)

  if (!session) {
    return res.status(400).json({
      message: "Not signin",
    })
  }

  const { id, level } = req.body

  if (!id || !level) {
    return res.status(400).json({
      message: "Missing parameter",
    })
  }

  try {
    const vote = await prisma.vote.findFirst({
      where: {
        articleId: id,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    })
    const upsertVote = await prisma.vote.upsert({
      where: {
        id: vote?.id || -1,
      },
      update: {
        level: level,
      },
      create: {
        user: { connect: { id: session?.user?.id as string } },
        article: { connect: { id: id } },
        level: level,
      },
    })
    return res.status(200).json(upsertVote)
  } catch (_) {
    return res.status(400).json({
      message: "Unexpected error occurred.",
    })
  }
}
