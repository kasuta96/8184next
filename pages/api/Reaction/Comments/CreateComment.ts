import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function CreateComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, text } = req.body
  const session = await getSession({ req })

  if (!id || !text || !session) {
    return res.status(400).json({ message: "Missing parameter." })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        user: { connect: { id: session?.id as string } },
        article: { connect: { id: id } },
        content: text,
      },
    })

    return res.status(200).json(comment)
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occurred." })
  }
}
