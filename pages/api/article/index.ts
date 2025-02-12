import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"
import slugify from "../../../lib/slugify"
import { auth } from "../../../lib/auth"
// POST /api/article
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  interface Data {
    id?: any
    title: string
    content: { blocks: any[] }
    description: string
    thumbnail: string
    tags: string
    slug: string
    source?: {
      author?: string
      id?: string
      url?: string
    }
    draft: boolean
  }

  const handleData = async (data: Data) => {
    // if hasn't description -> get first paragraph
    if (!data.description) {
      const firstP = data.content.blocks.find((e: { type: string }) => e.type == "paragraph")
      data.description = firstP?.data.text || ""
    }

    // set default thumbnail: first image on content
    if (!data.thumbnail) {
      const firstImg = data.content.blocks.find((e: { type: string }) => e.type == ("image" || "simpleImage"))
      data.thumbnail = firstImg?.data.url || firstImg?.data.file.url || ""
    }

    data.slug = slugify(data.title)

    // More handle data ...

    return data
  }

  const session = await auth(req, res)

  const checkAuthor = async (articleId: any) => {
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

  if (req.method === "POST") {
    const reqData = await handleData(req.body)
    const { id, title, content, description, thumbnail, tags, slug, source, draft } = reqData

    // source
    let copyright = []
    id &&
      copyright.push({
        name: "Fork",
        data: {
          id: id,
        },
      })
    source &&
      copyright.push({
        name: "Copyright",
        data: source,
      })

    // 0: public, 1: draft
    let status = 0
    if (draft) status = 1

    const data = {
      title: title,
      content: content,
      slug: slug,
      author: { connect: { id: session?.user?.id as string } },
      description: description,
      thumbnail: thumbnail,
      tags: tags,
      sticker: { copyright: copyright },
      status: status,
    }

    const result = await prisma.article.create({
      data: data,
    })

    // if has soure -> from rss page -> route to edit page
    if (source)
      return res.json({
        status: "success",
        route: "/a/create?id=" + result.id,
      })

    // default return
    return res.json({
      status: "success",
      route: "/a/" + slug + "-" + result.id,
    })
  } else if (req.method === "PUT") {
    const reqData = await handleData(req.body)
    const { id, title, content, description, thumbnail, tags, slug, draft } = reqData

    // 0: public, 1: draft
    let status = 0
    if (draft) status = 1

    // Check article belong to user or not
    const belongsToUser = await checkAuthor(id)
    if (belongsToUser) {
      await prisma.article.update({
        where: {
          id: Number(id),
        },
        data: {
          title: title,
          content: content,
          slug: slug,
          description: description,
          thumbnail: thumbnail,
          tags: tags,
          status: status,
        },
      })
      return res.json({
        status: "success",
        route: "/a/" + slug + "-" + id,
      })
    } else {
      return res.json({
        status: "error",
        message: "notAuthor",
      })
    }
  }
}
