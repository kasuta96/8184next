import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function fetchComment(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query

  if (!id) {
    // get all categories
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              article: true,
            },
          },
        },
      })

      return res.status(200).json(categories)
    } catch (_) {
      return res.status(400).json({ message: "Unexpected error occurred." })
    }
  } else {
    // get 1 category by id
    try {
      const categories = await prisma.category.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              article: true,
            },
          },
        },
      })

      return res.status(200).json(categories)
    } catch (_) {
      return res.status(400).json({ message: "Unexpected error occurred." })
    }
  }
}
