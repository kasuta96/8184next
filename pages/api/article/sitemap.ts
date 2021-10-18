import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get all article
    const article = await prisma.article.findMany({
      where: {
        status: 0,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    })

    return res.json(article)
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}
