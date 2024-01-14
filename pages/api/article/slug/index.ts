import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const select = {
    id: true,
    slug: true,
    published: true,
    createdAt: true,
    updatedAt: true,
  }

  try {
    // get all article
    const article = await prisma.article.findMany({
      where: {
        status: 0,
        published: true,
      },
      orderBy: {
        id: "desc",
      },
      select: select,
    })

    // response data like data: {articles}
    return res.status(200).json(article)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    })
  }
}
