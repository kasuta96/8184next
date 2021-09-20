import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const kw = req?.query?.kw?.toString() || ""
  // if has [published=false] request query
  const published = req?.query?.published == "false" ? false : true
  // if has [published=false] request query
  const draft = req?.query?.draft == "true" ? true : false
  const user = req?.query?.user?.toString() || ""

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

  try {
    // get user's article
    if (draft && user) {
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
              status: 1,
              OR: [
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
              ],
            },
            orderBy: {
              id: "desc",
            },
            select: select,
          },
        },
      })

      console.log(data.articles)

      return res.json(data.articles)
    } else {
      // get all article
      const articles = await prisma.article.findMany({
        take: 10,
        where: {
          status: 0,
          published: published,
          OR: [
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
          ],
        },
        orderBy: {
          id: "desc",
        },
        select: select,
      })

      return res.json(articles)
    }
  } catch (error) {
    return res.status(500).json({
      status: "DBError",
      error: true,
      message: error,
    })
  }
}
