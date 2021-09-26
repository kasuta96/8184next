import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import prisma from "../../../lib/db"

// DELETE /api/article/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const articleId = req.query.id
  const session = await getSession({ req })

  const checkAuthor = async () => {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(articleId),
      },
      select: {
        id: true,
        authorId: true,
      },
    })
    return article?.authorId === session?.user?.id
  }

  const belongsToUser = await checkAuthor()
  const modOrAdmin = session?.user?.role !== ("MOD" || "ADMIN")

  if (req.method === "DELETE") {
    if (belongsToUser || modOrAdmin) {
      await prisma.article.update({
        where: {
          id: Number(articleId),
        },
        data: {
          status: 9,
        },
      })
      return res.status(200).json({
        message: "success",
      })
    } else {
      return res.status(203).json({
        status: "notAuthor",
      })
    }
  } else if (req.method === "GET") {
    const article = await prisma.article.findFirst({
      where: {
        id: Number(articleId) || -1,
        OR: [
          {
            status: 0,
          },
          {
            status: 1,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        tags: true,
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        content: true,
        sticker: true,
        published: true,
        status: true,
        createdAt: true,
      },
    })
    if (article) {
      return res.json({
        status: true,
        body: article,
      })
    } else {
      return res.json({
        status: false,
      })
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}
