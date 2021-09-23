import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const kw = req?.query?.kw?.toString() || ""
  // if has [published=false] request query
  const published = req?.query?.published == "false" ? false : true
  // if has [published=false] request query
  const draft = req?.query?.draft == "true" ? true : false
  const user = req?.query?.user?.toString() || ""
  const category = req?.query?.category?.toString() || ""

  const select = {
    id: true,
    title: true,
    slug: true,
    description: true,
    thumbnail: true,
    tags: true,
    author: {
      select: {
        name: true,
        id: true,
        image: true,
      },
    },
    published: true,
    createdAt: true,
  }
  const kwSearch = [
    {
      title: {
        contains: kw,
      },
    },
    {
      tags: {
        contains: kw,
      },
    },
  ]

  try {
    // get user's article
    if (user) {
      const data = await prisma.user.findUnique({
        where: {
          id: user,
        },
        select: {
          name: true,
          role: true,
          articles: {
            take: 10,
            where: {
              status: draft ? 1 : 0,
              OR: kwSearch,
            },
            orderBy: {
              id: "desc",
            },
            select: select,
          },
        },
      })
      return res.json(data)

      // get catrgory's articles
    } else if (category) {
      const data = await prisma.category.findUnique({
        where: {
          id: Number(category),
        },
        select: {
          name: true,
          description: true,
          article: {
            take: 10,
            where: {
              status: 0,
              OR: kwSearch,
            },
            orderBy: {
              id: "desc",
            },
            select: select,
          },
        },
      })

      return res.json(data)
    } else {
      // get all article
      const article = await prisma.article.findMany({
        take: 10,
        where: {
          status: 0,
          published: published,
          OR: kwSearch,
        },
        orderBy: {
          id: "desc",
        },
        select: select,
      })

      // response data like data: {articles}
      return res.json({ article })
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    })
  }
}
