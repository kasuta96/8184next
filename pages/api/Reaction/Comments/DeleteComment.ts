import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function DeleteComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, comment } = req.body

  const session = await getSession({ req })

  if (!id || !comment || !session) {
    return res.status(400).json({ message: "Missing parameter." })
  }

  try {
    const isAuthor = session.user.id === comment.user.id

    if (!isAuthor) {
      return res.status(400).json({ message: "Need authorization." })
    }

    // delete
    await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    })

    return res.status(200).json({ message: "success" })
  } catch (err) {
    return res.status(400)
  }
}
