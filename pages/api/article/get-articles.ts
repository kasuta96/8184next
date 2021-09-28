import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const kw = req?.query?.kw?.toString() || ""
  // if has [published=false] request query
  const published = req?.query?.published == "false" ? false : true
  // if has [draft=true] get user id -> get user's draft (status = 1)
  const draft = req?.query?.draft == "true" ? true : false
  const user = req?.query?.user?.toString() || ""
  // category
  const category = req?.query?.category?.toString() || ""

  // take & skip & sort
  const take = 5
  // time for get more
  const time = req?.query?.time?.toString() || ""

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
          _count: {
            select: {
              article: true,
            },
          },
          name: true,
          role: true,
          article: {
            take: take,
            where: {
              status: draft ? 1 : 0,
              OR: kwSearch,
              createdAt: {
                lt: time ? new Date(time) : new Date(),
              },
            },
            orderBy: {
              id: "desc",
            },
            select: select,
          },
        },
      })
      return res.json({ take: take, ...data })

      // get catrgory's articles
    } else if (category) {
      const data = await prisma.category.findUnique({
        where: {
          id: Number(category),
        },
        select: {
          _count: {
            select: {
              article: true,
            },
          },
          name: true,
          description: true,
          article: {
            take: take,
            where: {
              status: 0,
              OR: kwSearch,
              createdAt: {
                lt: time ? new Date(time) : new Date(),
              },
            },
            orderBy: {
              id: "desc",
            },
            select: select,
          },
        },
      })

      return res.json({ take: take, ...data })
    } else {
      // get all article
      const article = await prisma.article.findMany({
        take: take,
        where: {
          status: 0,
          published: published,
          OR: kwSearch,
          createdAt: {
            lt: time ? new Date(time) : new Date(),
          },
        },
        orderBy: {
          id: "desc",
        },
        select: select,
      })

      // response data like data: {articles}
      return res.json({ take: take, article })
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    })
  }
}
