import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/db"

// DELETE /api/article/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const rawSlug = req.query.slug
  const regex = /(.*)-([0-9]+)/
  const match = rawSlug.toString().match(regex)
  const slug = match[1]
  const id = match[2]
  console.log("slug", slug)
  console.log("id", id)

  const article = await prisma.article.findFirst({
    where: {
      id: Number(id),
      slug: slug,
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
    return res.status(200).json(article)
  } else {
    return res.status(404).json({
      message: "notFound",
    })
  }
}
