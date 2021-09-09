import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { article } = req.query

  if (!article) {
    return res.status(400).json({ message: "Missing parameter." })
  }

  try {
    // get data
    const comments = await prisma.comment.findMany({
      where: {
        articleId: Number(article),
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            // Vote: {
            //   where: {
            //     articleId: Number(article),
            //   },
            //   select: {
            //     level: true,
            //   },
            // },
          },
        },
        content: true,
        articleId: true,
        parentId: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        id: "desc",
      },
    })

    return res.status(200).json(comments)
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occurred." })
  }
}
